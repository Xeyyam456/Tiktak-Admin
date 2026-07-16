# Tiktak Admin — API Sənədləşdirməsi

Bu sənəd `Tiktak | E-commerce Api's | Stage 3-4 Final` Postman kolleksiyasından çıxarılıb və yalnız **admin panelə aid** endpointləri əhatə edir (Client/mobile tərəfə aid `Basket`, `Favorites`, `Signup` və s. bura daxil edilməyib, çünki admin panelin onlara ehtiyacı yoxdur).

Bu sənəd `src/lib/mockData.js`-dəki mövcud mock strukturunu real API cavabları ilə uyğunlaşdırmaq və hər səhifəni tədricən real API-yə qoşmaq üçün əsas mənbədir.

---

## 1. Base URL

Təsdiqlənib (canlı backend-ə test sorğuları ilə yoxlanılıb — `2026-07-16`):

```
VITE_API_BASE_URL=https://api.sarkhanrahimli.dev
```

> ⚠️ `/api/tiktak` bu dəyərin **tərkibinə daxil deyil** — hər endpoint yolunun özündə var (aşağıya bax). `VITE_API_BASE_URL`-ə `/api/tiktak` əlavə edib istifadə etsəniz, yol ikiqat təkrarlanar (`.../api/tiktak/api/tiktak/...`) və `404` alarsınız.

Bütün endpointlər bu prefiksdə yerləşir:

```
{BASE_URL}/api/tiktak/...
```

---

## 2. Autentifikasiya

- Login xaric **bütün** endpointlər (bax §12) aşağıdakı header-ləri tələb edir:
  ```
  Authorization: Bearer <access_token>
  Content-Type: application/json
  ```
  (`Upload` endpointi istisnadır — o `multipart/form-data` göndərir, `Content-Type`-ı browser/axios avtomatik qoyur, əl ilə təyin edilməməlidir)
- Demək olar bütün sorğularda əlavə header var:
  ```
  Accept-Language: {{LANG}}
  ```
  (kolleksiyada konkret dəyər göstərilməyib — `az` istifadə edilməsi məntiqlidir, sadəcə backend-in dəstəklədiyi dəyərləri təsdiqləmək lazımdır)
- `access_token` müddəti bitdikdə `POST /api/tiktak/auth/refresh` ilə yenilənir (aşağıda).

### Standart cavab zərfi (response envelope)

Demək olar bütün endpointlər eyni formatda cavab qaytarır:

```json
{
  "message": "Ok",
  "data": { /* ... */ },
  "result": true
}
```

İstisna: `orders/admin/stats` bu zərfi **istifadə etmir**, birbaşa obyekt qaytarır (bax§ 8.2).

---

## 3. Auth

### 3.1 Admin Login
```
POST /api/tiktak/auth/admin/login
```
Header: yoxdur (auth tələb olunmur)

Body:
```json
{
  "phone": "+994105554422",
  "password": "Admin1234"
}
```

Cavab `200 OK`:
```json
{
  "message": "Ok",
  "data": {
    "tokens": {
      "access_token": "...",
      "refresh_token": "..."
    },
    "profile": {
      "id": 2,
      "full_name": "Tiktak Admin",
      "phone": "+994105554422",
      "address": null,
      "img_url": null,
      "role": "ADMIN",
      "created_at": "2025-06-12T05:44:27.813Z"
    }
  },
  "result": true
}
```

### 3.2 Token Refresh
```
POST /api/tiktak/auth/refresh
```
Header: `Accept-Language`

Body:
```json
{ "refresh_token": "{{REFRESH_TOKEN}}" }
```

Cavab `200 OK`:
```json
{
  "message": "Ok",
  "data": {
    "access_token": "...",
    "refresh_token": "..."
  },
  "result": true
}
```

---

## 4. Profile (giriş etmiş admin)

### 4.1 Get Profile
```
GET /api/tiktak/admin/profile
```
Auth: Bearer | Header: `Accept-Language`

Cavab `200 OK`:
```json
{
  "message": "Ok",
  "data": {
    "id": 2,
    "full_name": "Tiktak Admin",
    "phone": "+994105554422",
    "address": null,
    "img_url": null,
    "role": "ADMIN",
    "created_at": "2025-06-12T05:44:27.813Z"
  },
  "result": true
}
```

---

## 5. Users (`İstifadəçilər` səhifəsi)

### 5.1 List Users
```
GET /api/tiktak/admin/users
```
Auth: Bearer | Header: `Accept-Language`

Cavab `200 OK`:
```json
{
  "message": "Ok",
  "data": [
    {
      "id": 3,
      "full_name": "John Doe",
      "phone": "+994516667766",
      "address": null,
      "img_url": null,
      "role": "COMMERCE",
      "password": "$2b$10$...",
      "created_at": "2025-06-12T05:47:24.588Z"
    }
  ],
  "result": true
}
```

> ⚠️ Cavabda `password` (hash) sahəsi var — admin UI-də göstərilməməli, sadəcə API-nin qaytardığı xam formadır. Bu səhifə üçün kolleksiyada `create` / `update` / `delete` endpointi **yoxdur** — yalnız `list` mövcuddur.

---

## 6. Category (`Kateqoriyalar` səhifəsi)

> ⚠️ Diqqət: **create** tək saylı (`/category`), **update/delete/list** cəm saylı (`/categories`) yoldan istifadə edir — bu API-nin real qeyri-müntəzəmliyidir, səhv deyil.

### 6.1 List
```
GET /api/tiktak/admin/categories
```
Cavab `data`: array of
```json
{
  "id": 1,
  "name": "Elektronika",
  "img_url": "https://...",
  "description": "Smartfonlar, laptoplar...",
  "created_at": "2025-06-12T05:37:56.753Z"
}
```

### 6.2 Create
```
POST /api/tiktak/admin/category
```
Body:
```json
{
  "name": "Category-1",
  "description": "Lorem",
  "img_url": ""
}
```
`img_url` **optionaldır**. Cavab `201 Created`, `data` yeni yaradılmış kateqoriyadır (`id`, `created_at` daxil).

### 6.3 Update
```
PUT /api/tiktak/admin/categories/:id
```
Body eyni formada (`name`, `description`, `img_url`). Cavab `200 OK`.

### 6.4 Delete
```
DELETE /api/tiktak/admin/categories/:id
```
Body yoxdur. Cavab:
```json
{ "message": "Successfully removed", "data": null, "result": true }
```

Auth: bütün Category endpointləri Bearer + `Accept-Language` tələb edir.

---

## 7. Products (`Məhsullar` səhifəsi)

> ⚠️ Eyni qeyri-müntəzəmlik: **create** tək saylı (`/product`), **update/delete/list** cəm saylı (`/products`).

### 7.1 List
```
GET /api/tiktak/admin/products
```
Query parametrləri (kolleksiyada mövcud, default olaraq deaktiv):
| param | təsvir |
|---|---|
| `limit` | səhifə başına say (məs. `5`) |
| `page` | səhifə nömrəsi (məs. `1`) |
| `search` | title, description və price üzrə axtarış |

Cavab `data`: array, hər elementdə daxili `category` obyekti (qısa forma: `id`, `name`). Həmçinin `pagination` sahəsi qaytarılır:
```json
{
  "message": "Ok",
  "data": [ /* products */ ],
  "pagination": { "next": null, "prev": null, "current": 1, "total": 2, "totalPages": 1 },
  "result": true
}
```

### 7.2 Create
```
POST /api/tiktak/admin/product
```
Body:
```json
{
  "title": "Producty-3 Icki",
  "description": "Lorem ipsum",
  "price": "8.90",
  "type": "litre",
  "img_url": "",
  "category_id": 1
}
```

`type` sahəsi `ProductMeasure` enum-udur:
```
kg | gr | litre | ml | meter | cm | mm | piece | packet | box
```

`img_url` optionaldır. Cavab `201 Created`, `data`-da tam `category` obyekti geri qayıdır.

### 7.3 Update
```
PUT /api/tiktak/admin/products/:id
```
Body eyni sahələr (create ilə eyni). Cavab `200 OK`.

### 7.4 Delete
```
DELETE /api/tiktak/admin/products/:id
```
Cavab:
```json
{ "message": "Successfully removed", "data": null, "result": true }
```

Auth: bütün Products endpointləri Bearer + `Accept-Language` tələb edir.

---

## 8. Orders (`Sifarişlər` səhifəsi)

> ⚠️ Diqqət: digər admin resurslarından fərqli olaraq bu qrup `/api/tiktak/admin/...` yox, **`/api/tiktak/orders/admin`** prefiksindən istifadə edir.

### 8.1 List
```
GET /api/tiktak/orders/admin
```
Auth: Bearer | Header: `Accept-Language`

> Qeyd: Postman kolleksiyasında bu `GET` sorğusuna (yəqin copy-paste səhvi üzündən) bir JSON body əlavə olunub (`basket_id`, `payment`, `note`) — bu sifariş **yaratma** ilə əlaqəli deyil və `GET` sorğusunda adətən nəzərə alınmır, real inteqrasiyada bu bodini göndərməyə ehtiyac yoxdur.

Cavab `data`: array, hər sifarişdə `user` (qısa) və `items[].product` (tam, `category` daxil) daxildir:
```json
{
  "message": "Ok",
  "data": [
    {
      "id": 1,
      "orderNumber": "ORD-20250613-630",
      "total": "18.89",
      "deliveryFee": "0.00",
      "paymentMethod": "CARD",
      "status": "PENDING",
      "note": "Lorem ipsum",
      "address": "Aga Neymatulla",
      "phone": "+994103193897",
      "createdAt": "2025-06-13T07:35:41.867Z",
      "updatedAt": "2025-06-13T07:35:41.867Z",
      "user": { "id": 3, "full_name": "John Doe", "img_url": "https://..." },
      "items": [
        {
          "id": 1,
          "quantity": 1,
          "total_price": "12.90",
          "product": { "id": 5, "title": "...", "img_url": "", "description": "...", "price": "12.90", "type": "litre", "created_at": "...", "category": { "...": "..." } }
        }
      ]
    }
  ],
  "result": true
}
```

### 8.2 Stats
```
GET /api/tiktak/orders/admin/stats
```
Auth: Bearer | Header: `Accept-Language`

> ⚠️ Bu endpoint standart `{ message, data, result }` zərfini **istifadə etmir** — birbaşa obyekt qaytarır:
```json
{
  "TOTAL": 1,
  "DELIVERED": 0,
  "PENDING": 0,
  "PREPARING": 1,
  "TOTAL_REVENUE": 0
}
```
(nümunə cavabda bütün `OrderStatus` dəyərləri əks olunmayıb — `CONFIRMED`, `READY`, `CANCELLED` sayğacları da mövcud ola bilər, backend-lə təsdiqlənməlidir)

### 8.3 Update Status
```
PUT /api/tiktak/orders/admin/:id/status
```
Auth: Bearer | Header: `Accept-Language`

Body:
```json
{ "status": "PREPARING" }
```

`status` sahəsi `OrderStatus` enum-udur:
```
PENDING | CONFIRMED | PREPARING | READY | DELIVERED | CANCELLED
```

Cavab `200 OK`, `data` yenilənmiş sifarişdir (`items` daxil, lakin `user` sahəsi bu cavabda **yoxdur** — list cavabından fərqli olaraq).

---

## 9. Upload (şəkil yükləmə)

Bütün `img_url` sahələri (Category/Product/Campaign) üçün ortaq fayl yükləmə endpointi:

```
POST /api/tiktak/upload
```
Auth: Bearer (yalnız token, `Accept-Language` header-i yoxdur)

Body: `multipart/form-data`
| key | type |
|---|---|
| `file` | file |

Cavab `201 Created`:
```json
{
  "message": "File uploaded successfully",
  "data": { "url": "https://uploads.sarkhanrahimli.dev/onlearn/images/onlearn-file-....webp" },
  "result": true
}
```

Qaytarılan `data.url` birbaşa `imageUrl` / `img_url` sahəsinə yazılmalıdır (CRUD formalarındakı "Şəkil ünvanı" inputunun avtomatlaşdırılmış versiyası).

---

## 10. Kampaniyalar (Campaign)

> ⚠️ Eyni qeyri-müntəzəmlik: **create** tək saylı (`/campaign`), **update/delete/list** cəm saylı (`/campaigns`).

### 10.1 List
```
GET /api/tiktak/admin/campaigns
```

### 10.2 Create
```
POST /api/tiktak/admin/campaign
```
Body:
```json
{ "title": "Campaign-1", "description": "Lorem", "img_url": "" }
```
`img_url` optionaldır. Cavab `201 Created`.

### 10.3 Update
```
PUT /api/tiktak/admin/campaigns/:id
```
Body eyni sahələr.

### 10.4 Delete
```
DELETE /api/tiktak/admin/campaigns/:id
```
Cavab:
```json
{ "message": "Successfully removed", "data": null, "result": true }
```

Auth: bütün Campaign endpointləri Bearer + `Accept-Language` tələb edir.

---

## 11. Admin panel səhifə ↔ endpoint uyğunluğu

| Səhifə (route) | Mock mənbəyi | Real endpoint qrupu |
|---|---|---|
| `/login` | — | §3 Auth |
| `/sifarisler` | `mockData.js` orders | §8 Orders |
| `/kampaniyalar` | `mockData.js` campaigns | §10 Campaign |
| `/kateqoriyalar` | `mockData.js` categories | §6 Category |
| `/mehsullar` | `mockData.js` products | §7 Products |
| `/istifadeciler` | `mockData.js` users | §5 Users (yalnız `list`) |

---

## 12. Bilinən boşluqlar / təsdiqlənməli məqamlar

- Canlı backend-də **bütün** endpointlər (Postman kolleksiyasında "auth" açarı olmayan Client `categories`/`campaigns`/`products` kimi "public" görünənlər daxil) token olmadan `401 "Auth access error"` qaytarır. Yəni admin panel də daxil olmaqla, token yoxdursa heç bir sorğu işləməyəcək — sadəcə login üçün token əldə etməmiş digər sorğuları göndərməyə çalışmayın.
- `Accept-Language` (`LANG`) üçün dəstəklənən konkret dəyərlər (`az`/`en`/`ru`?) təsdiqlənməyib.
- Users səhifəsi üçün create/update/delete endpointi kolleksiyada yoxdur — admin UI-də bu əməliyyatlar hazırda yalnız mock üzərindədir, backend-də dəstəklənmirsə bu funksionallıq admin paneldən çıxarılmalı və ya backend-ə əlavə edilməlidir.
- Orders `list` üçün filter/pagination query parametrləri kolleksiyada göstərilməyib (Products-dakı kimi `limit`/`page`/`search` mövcud ola bilər, amma təsdiqlənməyib).
- `orders/admin/stats` cavabında bütün status dəyərlərinin sayğacı olub-olmadığı (məs. `CANCELLED`) təsdiqlənməyib.
