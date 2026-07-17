# Tik Tak Admin — Kodun Tam İzahı (0-dan 100-ə)

Bu sənəd, layihədəki **hər bir faylı sətir-sətir** izah edir. Heç bir proqramlaşdırma təcrübəsi olmayan biri (kursa yeni başlayan səviyyəsi) belə, bu sənədi oxuyub layihənin necə işlədiyini başa düşə bilməlidir.

**Bu layihə TypeScript-dədir** (adi JavaScript deyil) — bu, hər faylın sonunda `.js`/`.jsx` yox, `.ts`/`.tsx` olması deməkdir. TypeScript nədir, niyə var, necə oxunur — bunların hamısı aşağıda, xüsusi bir bölmədə, ADDIM-ADDIM, çox sadə dildə izah olunub. Qorxmayın — TypeScript, JavaScript-in ÜZƏRİNƏ, sadəcə "bu dəyər hansı NÖV-dədir" məlumatını əlavə edən bir təbəqədir, əsas məntiq (funksiyalar, komponentlər) tamamilə eynidir.

**Necə oxumaq lazımdır:** Əvvəlcə "Hissə 1", "Hissə 2" və "Hissə 3"-ü oxuyun (bunlar bütün kodda təkrar-təkrar rast gələcəyiniz JavaScript/React VƏ TypeScript sintaksisini izah edir — Hissə 3 məhz TypeScript üçündür və ƏN ƏTRAFLI bölmədir). Sonra istənilən sırayla, istədiyiniz faylın izahına keçə bilərsiniz — hər bölmə özbaşınadır.

---

## Mündəricat

1. [Bu layihə nədir və nə üçün belə qurulub](#hissə-1-bu-layihə-nədir)
2. [JavaScript/React sintaksis lüğəti — əvvəlcə bunu oxuyun](#hissə-2-sintaksis-lüğəti)
3. [TypeScript sintaksis lüğəti — bunu da mütləq oxuyun](#hissə-3-typescript-lüğəti)
4. [Qovluq strukturu — hər qovluq nə üçündür](#hissə-4-qovluq-strukturu)
5. [`src/types/` qovluğu — bütün tip faylları](#hissə-5-types-qovluğu)
6. [Giriş nöqtəsi: `main.tsx` və `App.tsx`](#hissə-6-giriş-nöqtəsi)
7. [Marşrutlaşdırma (Routing): `AppRoutes.tsx`, `RequireAuth.tsx`, `RedirectIfAuth.tsx`](#hissə-7-routing)
8. [Autentifikasiya (Auth): `session.ts`, `useAuthStore.ts`, `authService.ts`](#hissə-8-auth)
9. [API qatı: `axiosInstance.ts` və servis faylları](#hissə-9-api-qatı)
10. [Adapterlər: API formatını UI formatına çevirmək](#hissə-10-adapterlər)
11. [Sabitlər (Constants): `productTypes.ts`, `orderStatus.ts`](#hissə-11-sabitlər)
12. [`formatDate.ts`](#hissə-12-formatdate)
13. [TanStack Query qatı: `queryClient.ts`](#hissə-13-tanstack-query)
14. [Ortaq (shared) komponentlər](#hissə-14-shared-komponentlər)
15. [Öz hook-larımız (custom hooks)](#hissə-15-custom-hooks)
16. [`Pagination.tsx`](#hissə-16-pagination)
17. [Layout: `AdminLayout.tsx`, `Sidebar.tsx`, `Header.tsx`](#hissə-17-layout)
18. [Səhifələr: Login, NotFound, Categories, Campaigns, Products, Orders, Users](#hissə-18-səhifələr)
19. [CSS Modules necə işləyir](#hissə-19-css-modules)
20. [Tooling: `tsconfig.json`, `.oxlintrc.json`, `vite-env.d.ts`](#hissə-20-tooling)
21. [Lüğət — tez-tez rast gələcəyiniz sözlər](#hissə-21-lüğət)

---

## Hissə 1: Bu layihə nədir

Bu, **Tik Tak** adlı bir e-ticarət saytının **admin panelidir** — yəni mağazanın işçilərinin sifarişlərə, məhsullara, kateqoriyalara, kampaniyalara və istifadəçilərə baxıb idarə etdiyi daxili veb-tətbiqdir. Müştərilərin özlərinin gördüyü sayt deyil, "arxa ofis" hissəsidir.

Texnologiyalar:
- **React** — istifadəçi interfeysini (UI) qurmaq üçün JavaScript kitabxanası. "Komponent" adlanan kiçik hissələrdən (düymə, cədvəl, forma) böyük səhifələr qururuq.
- **TypeScript** — JavaScript-in ÜZƏRİNƏ "tip" (data növü) yoxlaması ƏLAVƏ EDƏN bir dil. Kodu YAZARKƏN (hələ işə salmadan) səhvləri (məs. "bu funksiyaya rəqəm əvəzinə mətn verilib" kimi) tapmağa kömək edir. Aşağıda Hissə 3-də ətraflı izah olunur.
- **Vite** — layihəni sürətlə işə salan və "build" (yəni brauzerin başa düşəcəyi fayllara çevirən) alət.
- **react-router-dom** — brauzerdə ünvan çubuğundakı yol (`/sifarisler`, `/kateqoriyalar` və s.) dəyişəndə hansı komponentin göstəriləcəyini idarə edir.
- **axios** — backend (server) ilə HTTP sorğuları (GET, POST, PUT, DELETE) göndərmək üçün kitabxana.
- **@tanstack/react-query** — serverdən gələn datanı (kateqoriyalar siyahısı, sifarişlər və s.) yükləmək, yaddaşda saxlamaq (cache) və yeniləmək üçün kitabxana.
- **zustand** — komponentlər arasında paylaşılan sadə "qlobal state" (bu layihədə yalnız login məlumatı üçün istifadə olunur).
- **sonner** — ekranın küncündə çıxan bildiriş qutucuqları (toast) üçün kitabxana.
- **lucide-react** — bütün ikonların (zəng, göz, qələm və s.) gəldiyi kitabxana.
- **CSS Modules** — hər komponentin öz CSS faylı olur və klaslar avtomatik unikal edilir ki, bir komponentin stili başqasına təsir etməsin.
- **oxlint** — kodu YAZARKƏN "bu səhvdir" deyə xəbərdarlıq edən alət (linter). ESLint-in daha sürətli bir alternativi, TypeScript-i də başa düşür.

**Qısaca "niyə TypeScript?"** Adi JavaScript-də, məsələn bir funksiyaya səhvən massiv əvəzinə obyekt versəniz, bunu YALNIZ proqramı İŞƏ SALIB, o hissəyə GƏLƏNDƏ (bəzən istifadəçinin kompüterində!) bir XƏTA kimi görürsünüz. TypeScript isə bunu SİZ KODU YAZARKƏN, REDAKTORDA QIRMIZI XƏTT ÇƏKƏRƏK dərhal göstərir — səhv İSTİFADƏÇİYƏ ÇATMAZDAN ƏVVƏL tutulur.

---

## Hissə 2: Sintaksis lüğəti

Kodun içində dəfələrlə görəcəyiniz "qəliz görünən" simvolları burda sadələşdirib izah edirik. Bunları bir dəfə anlasanız, aşağıdakı bütün fayllar çox rahat oxunacaq. (Bu bölmə TypeScript-ə aid DEYİL — sadəcə JavaScript/React. TypeScript-in ÖZ sintaksisi üçün Hissə 3-ə keçin.)

### `import` / `export` — fayllar arası əlaqə

```ts
import { useState } from 'react'      // "react" paketindən useState adlı şeyi gətir
import Button from '@/shared/components/Button/Button'  // Button faylından "default export"-u gətir
export default function App() { ... } // bu faylın ƏSAS (default) ixracı
export const foo = () => {}           // bu faylın ADI ilə ixrac olunan şeyi (bir fayldan bir neçə belə ola bilər)
```
- `export default` — hər faylda **yalnız bir dənə** ola bilər, import edərkən istənilən adla çağıra bilərsiniz.
- `export const X` (adlı/named export) — bir fayldan bir neçə ola bilər, import edərkən **dəqiq həmin adla**, fiqurlu mötərizədə gətirilməlidir: `import { X } from '...'`.
- `@/` — bu layihədə "qısayoldur", `src/` qovluğuna işarə edir (`tsconfig.json`-da təyin olunub). Yəni `@/shared/components/Button/Button` = `src/shared/components/Button/Button.tsx`.

### Dəyişən elan etmək: `const` və `let`

```ts
const x = 5   // x-ə BİR DƏFƏ dəyər verilir, sonra dəyişdirilə bilməz
let y = 5     // y-ə sonra yenidən dəyər verilə bilər (y = 10)
```
Bu kodda demək olar həmişə `const` görəcəksiniz — funksiyalar da, obyektlər də adətən `const`-a yazılır.

### Ox funksiyası (arrow function)

```ts
function topla(a, b) { return a + b }   // klassik funksiya
const topla = (a, b) => a + b           // eyni şey, "ox funksiyası" forması
const salamla = () => { console.log('salam') }  // parametr yoxdursa boş mötərizə
const kvadrat = (x) => x * x            // { return ... } yazmasan, avtomatik "return" olur
```
`(parametrlər) => nəticə` — bu, "bu parametrləri al, bu nəticəni qaytar" deməkdir. Kodun demək olar hər yerində, xüsusən `.map()`, `.filter()`, `onClick={() => ...}` daxilində istifadə olunur.

### Destructuring (obyektdən/massivdən "çıxarıb almaq")

```ts
const user = { name: 'Ali', age: 20 }
const { name, age } = user        // user.name-i `name`-ə, user.age-i `age`-ə çıxarır
const { name: adı } = user        // "name" sahəsini fərqli adla (adı) çıxarmaq

const arr = [1, 2, 3]
const [birinci, ikinci] = arr     // birinci=1, ikinci=2

function Button({ variant, children }) { ... }  // funksiyanın PARAMETRİ birbaşa destructure olunur —
                                                  // yəni <Button variant="solid">mətn</Button> çağırılanda
                                                  // props obyektindən variant və children avtomatik çıxarılır
```

### Spread (`...`) və Rest (`...`)

Eyni üç nöqtə, İKİ FƏRQLİ məna daşıyır, kontekstdən asılıdır:

```ts
// SPREAD — obyekti/massivi "açıb" başqasının içinə tökmək
const a = { x: 1, y: 2 }
const b = { ...a, z: 3 }          // b = { x: 1, y: 2, z: 3 } (a-nın BÜTÜN sahələrini kopyalayır)
const c = { ...a, x: 99 }         // c = { x: 99, y: 2 } (sonra yazılan sahə əvvəlkini "üstələyir")

const arr1 = [1, 2]
const arr2 = [...arr1, 3]         // arr2 = [1, 2, 3]

// REST — "qalanları" bir yerə yığmaq (adətən funksiya parametrində)
function Button({ variant, children, ...rest }) { ... }
// variant və children ayrıca çıxarılır, QALAN bütün prop-lar (onClick, disabled, type və s.)
// "rest" adlı BİR obyektə yığılır — sonra <button {...rest}> ilə hamısı birdən elementə verilir
```

### Template literal (backtick `` ` `` ilə string)

```ts
const ad = 'Əli'
const salam = `Salam, ${ad}!`     // "Salam, Əli!" — ${...} içinə DƏYİŞƏN yazmaq olar
const url = `/admin/categories/${id}`  // dinamik URL qurmaq üçün çox işlədilir
```
Adi `'...'` və ya `"..."` daxilində `${}` işləmir — yalnız backtick (`` ` ``) daxilində işləyir.

### Ternar operator (qısa if/else)

```ts
const mesaj = yaş >= 18 ? 'Böyüksən' : 'Kiçiksən'
// oxunuşu: "əgər (yaş >= 18) DOĞRUDURSA → 'Böyüksən', YOXSA → 'Kiçiksən'"

{loading ? 'Göndərilir...' : 'Yarat'}   // JSX daxilində şərtə görə mətn göstərmək
```

### `&&` ilə şərti göstərmək (JSX-də çox işlədilir)

```ts
{loading && <Loading />}
```
Bu, "əgər `loading` doğrudursa, `<Loading/>`-u göstər, yoxsa HEÇ NƏ göstərmə" deməkdir. JavaScript-də `&&` soldan sağa yoxlayır — sol tərəf `false` olsa, sağ tərəfə belə baxmır (React da o zaman heç nə render etmir).

### Optional chaining `?.` — "əgər varsa, daxil ol"

```ts
const ad = user?.profile?.name
// user undefined/null-dursa, XƏTA VERMƏDƏN sadəcə `undefined` qaytarır
// user varsa amma profile yoxdursa, yenə xəta vermir, undefined qaytarır
// YALNIZ user.profile.name-in HAMISI mövcud olanda əsl dəyəri qaytarır

item.category?.name ?? ''   // aşağıda izah olunan ?? ilə birlikdə tez-tez görəcəksiniz
```
Bunsuz, `user.profile.name` yazsaydınız və `user` `null`/`undefined` olsaydı, proqram **xəta ilə dayanardı** ("Cannot read property 'profile' of undefined"). `?.` bunun qarşısını alır.

### Nullish coalescing `??` — "yoxdursa, bunu istifadə et"

```ts
const say = itemCount ?? 0
// itemCount `null` və ya `undefined`-dursa → 0 istifadə olunur
// itemCount 0-dırsa (əsl rəqəm kimi) → 0 elə YENƏ 0 qalır (bu, || -dan FƏRQLİDİR!)
```
Diqqət: `??` yalnız `null`/`undefined` üçün işləyir. `||` isə `0`, `''`, `false` kimi bütün "falsy" dəyərləri də əvəz edir — bu kodda hər ikisi işlədilir, məqsədə görə seçilib (məs. `form.imageUrl || ''` — boş string istəyəndə `||` düzgündür).

### Massiv metodları: `.map()`, `.filter()`, `.find()`, `.slice()`, `.reduce()`

```ts
const nömrələr = [1, 2, 3]

nömrələr.map(n => n * 2)          // [2, 4, 6] — HƏR elementi çevirib YENİ massiv qaytarır
nömrələr.filter(n => n > 1)       // [2, 3] — şərtə uyan elementləri SEÇİB yeni massiv qaytarır
nömrələr.find(n => n === 2)       // 2 — şərtə uyan İLK elementi (təkcə birini) qaytarır, tapmasa `undefined`
nömrələr.slice(0, 2)              // [1, 2] — indeks 0-dan 2-yə QƏDƏR (2 daxil deyil) "kəsib" yeni massiv qaytarır
nömrələr.reduce((cəm, n) => cəm + n, 0)  // 6 — massivi TƏK bir dəyərə "yığır" (topla, say, qrupla və s.)
```
Bu layihədə `.map()` ən çox JSX daxilində siyahı göstərmək üçün işlədilir:
```tsx
{categories.map((item) => <tr key={item.id}>{item.name}</tr>)}
```
Hər `item` üçün bir `<tr>` yaradır. `key={item.id}` React-a "bu sətir hansı data ilə bağlıdır" deyir ki, siyahı dəyişəndə düzgün yenilənsin.

`.reduce()` bir az fərqlidir — massivi GƏZİB, HƏR addımda bir "toplayıcı" dəyəri (yuxarıdakı misalda `cəm`) YENİLƏYİR, sonda TƏK bir nəticə qaytarır. `Orders.tsx`-də sifarişlərin statuslarını SAYMAQ üçün istifadə olunur (aşağıda ətraflı izah olunacaq).

### `async`/`await` və Promise — "gözlə, nəticə gələnə qədər"

Serverə sorğu göndərmək DƏRHAL bitmir (bir neçə millisaniyə çəkir). JavaScript bunu **Promise** (vəd) adlanan bir obyektlə idarə edir — "bu iş gələcəkdə bitəcək, bitəndə sənə xəbər verəcəm" deməkdir.

```ts
// .then() forması:
fetch('/api/data').then((cavab) => {
  console.log(cavab)  // sorğu bitəndə bura işə düşür
})

// async/await forması (eyni məna, daha oxunaqlı):
async function məlumatAl() {
  const cavab = await fetch('/api/data')  // bu sətirdə DAYANIR, sorğu bitənə qədər gözləyir
  console.log(cavab)                       // sonra buraya keçir
}
```
- `async` — funksiyanın daxilində `await` istifadə edəcəyini bildirir.
- `await` — "bu Promise bitənə qədər gözlə, sonra nəticəni bu dəyişənə yaz".
- `try { ... } catch (err) { ... }` — `await`-lə gözlədiyiniz iş XƏTA versə (məsələn, server 400/500 qaytarsa), proqram dayanmır, `catch` blokuna keçir, orada xətanı idarə edə bilirsiniz.

```ts
try {
  await createCategory(payload)   // uğurlu olarsa davam edir
} catch (err) {
  toast.error(err instanceof Error ? err.message : 'Xəta baş verdi')  // xəta olarsa buraya düşür
}
```
`err instanceof Error ? ... : ...` niyə belədir — Hissə 3-də (`unknown` bölməsində) izah olunur, çünki bu, MƏHZ TypeScript-in tələb etdiyi bir yoxlamadır.

### React-in özü: komponent, `props`, JSX

```tsx
function Salamla({ ad }) {          // bu bir KOMPONENTDİR — böyük hərflə başlayan funksiya
  return <h1>Salam, {ad}!</h1>      // JSX — HTML-ə bənzəyən, əslində JavaScript olan sintaksis
}

<Salamla ad="Əli" />                // istifadəsi — "ad" adlı PROP verilir
```
- **Komponent** = UI-nin bir hissəsini qaytaran funksiya.
- **Props** = komponentə kənardan verilən "parametrlər" (`<Button variant="solid">` — `variant` bir prop-dur).
- **JSX** = `<div>...</div>` kimi görünən, amma əslində arxa planda `React.createElement(...)` çağırışlarına çevrilən sintaksis. JSX daxilində `{}` yazsanız, içində "təmiz JavaScript" işlədə bilərsiniz (`{ad}`, `{say + 1}`, `{items.map(...)}`).

### `useState` — komponentin "yaddaşı"

```tsx
const [say, setSay] = useState(0)
// say → CARİ dəyər (başlanğıcda 0)
// setSay → say-ı DƏYİŞMƏK üçün funksiya
// setSay(5) çağırsanız, React komponenti YENİDƏN render edir, say artıq 5 olur

<button onClick={() => setSay(say + 1)}>Bas: {say}</button>
```
`useState`-siz, komponent daxilindəki adi dəyişənlər hər render-də "sıfırlanır" və ekranda dəyişiklik göstərmir. `useState` React-a "bu dəyəri render-lər arasında yadda saxla və dəyişəndə ekranı yenilə" deyir.

### `useEffect` — "yan təsir" (side effect)

```tsx
useEffect(() => {
  document.title = 'Yeni başlıq'   // bu, komponent EKRANA ÇIXANDA (mount) işə düşür

  return () => {
    document.title = 'Köhnə başlıq' // bu isə komponent EKRANDAN GEDƏNDƏ (unmount) işə düşür
  }
}, [])  // [] boş massiv = "yalnız BİR DƏFƏ, mount olanda işə sal"
```
`useEffect`-in ikinci parametri (`[]`, `[title]`, `[open, onClose]` və s.) **"dependency array"** adlanır — siyahıdakı dəyərlərdən HƏR HANSI biri dəyişəndə effekt YENİDƏN işə düşür. Boş `[]` = yalnız ilk dəfə. Heç yazmasanız = HƏR render-də (nadir hallarda istifadə olunur).

### `useMemo` — hesablamanı "yaddan çıxarmamaq" (cache)

```tsx
const filtered = useMemo(
  () => items.filter((i) => i.name.includes(search)),  // bu hesablama
  [items, search],                                        // yalnız bunlar dəyişəndə TƏKRAR işə düşür
)
```
`useMemo`-suz, komponent HƏR render-də (məsələn, başqa bir düymə klikləndə) bu filtri YENİDƏN hesablayardı, hətta `items`/`search` dəyişməsə belə. `useMemo` "əgər asılılıqlar eyni qalıbsa, köhnə nəticəni saxla, təzədən hesablama" deyir.

### Custom hook — öz `useXxx()` funksiyanız

Adı `use` ilə başlayan İSTƏNİLƏN funksiya "hook" sayılır. Bunun daxilində `useState`/`useEffect` kimi hazır hook-ları işlədib, öz təkrarlanan məntiqinizi bir yerə yığa bilərsiniz (bu layihədə `usePagination`, `useCrudModal`, `useTitle`, `useDebounce` — hamısı buna misaldır, aşağıda ətraflı izah olunub).

### CSS Modules idxalı

```ts
import styles from './Button.module.css'
// styles = { btn: 'Button-module__btn__aB3xZ', solid: 'Button-module__solid__k9F2p', ... }

<button className={styles.btn}>...</button>
```
`.module.css` şəklində bitən fayllar CSS Modules sayılır — Vite onları avtomatik tanıyır, hər klas adını UNİKAL edir (`.btn` → `Button-module__btn__aB3xZ` kimi bir şeyə çevrilir) ki, başqa faylda da `.btn` yazsanız TOQQUŞMA olmasın. `styles` obyekti CSS faylındakı klas adlarını JavaScript-dən əlçatan edir. (TypeScript-in bunu necə "tanıdığı" Hissə 20-də izah olunur.)

---

## Hissə 3: TypeScript lüğəti

**Bu bölmə, sizin XÜSUSİLƏ istədiyiniz hissədir — TypeScript-in NƏ olduğunu, NƏ üçün lazım olduğunu və hər bir simvolun DƏQİQ nə mənaya gəldiyini, ADDIM-ADDIM izah edir.** Digər bölmələrdəki (Hissə 6-dan sonra) HƏR fayl artıq TypeScript-dədir — bu bölməni oxumadan onlara keçsəniz, `interface`, `<T>`, `:` kimi işarələr sizə "qəliz" görünəcək. Əvvəlcə bunu oxuyun.

### TypeScript ÜMUMİYYƏTLƏ nədir?

TypeScript, JavaScript-in ELƏ ÖZÜDÜR — sadəcə ÜZƏRİNƏ "bu dəyər HANSI NÖVDƏNDİR" məlumatını (bunu **"tip"** və ya **"type"** adlandırırıq) əlavə edən bir dildir. Kodu brauzerdə İŞƏ SALMAZDAN ƏVVƏL, `tsc` (TypeScript Compiler) adlı bir alət bütün faylları OXUYUR və "bu funksiyaya YANLIŞ NÖV data verilib" kimi səhvləri TAPIR.

**Konkret misal — TypeScript OLMADAN (adi JS):**
```js
function cəmlə(a, b) {
  return a + b
}

cəmlə(5, 10)        // 15 — düzgün işləyir
cəmlə(5, "salam")   // "5salam" — SƏHVDİR (bir-birinə əlavə olunub, cəmlənməyib), AMMA proqram ÇÖKMÜR,
                     // sadəcə YANLIŞ NƏTİCƏ verir — bu SƏHVİ YALNIZ EKRANDA GÖRƏNDƏ ("5salam" niyə çıxdı?) TUTURSUNUZ
```

**EYNİ KOD, TypeScript İLƏ:**
```ts
function cəmlə(a: number, b: number): number {
  return a + b
}

cəmlə(5, 10)        // 15 — düzgün
cəmlə(5, "salam")   // REDAKTORDA DƏRHAL QIRMIZI XƏTT: "Argument of type 'string' is not assignable to parameter of type 'number'"
                     // — YƏNİ, KODU YAZARKƏN, HƏLƏ İŞƏ SALMADAN, SƏHV DƏRHAL GÖRÜNÜR
```

`a: number` — "`a` parametri MÜTLƏQ bir RƏQƏM olmalıdır" deməkdir. `: number` hissəsi — **tip annotasiyası** (type annotation) adlanır.

### Əsas tiplər (types)

```ts
let ad: string = 'Əli'           // mətn (sətir)
let yaş: number = 25              // rəqəm (həm tam, həm kəsr — JS-də ayrı "int"/"float" yoxdur)
let aktivdir: boolean = true      // true/false
let heçNə: null = null            // "bilərəkdən boş" dəyər
let təyinOlunmayıb: undefined = undefined  // "hələ dəyər verilməyib"
let siyahı: string[] = ['a', 'b'] // STRİNG-lərdən ibarət MASSİV (`string[]` = "massiv, hər elementi string")
let rəqəmSiyahı: number[] = [1, 2, 3]
```
JavaScript-də bu dəyərlər onsuz da MÖVCUDDUR (`'Əli'` onsuz da bir string-dir) — TypeScript sadəcə "bunu SİZ NİYYƏT EDİRSİNİZ, YOXSA GƏLƏCƏKDƏ SƏHVƏN BAŞQA BİR NÖV YAZILACAQ?" sualını əvvəlcədən yoxlayır.

**"Tip inference" (avtomatik tip tapma)** — HƏR YERDƏ `: string` yazmaq lazım DEYİL, TypeScript ÇOX VAXT ÖZÜ TAPIR:
```ts
const ad = 'Əli'        // TypeScript ÖZÜ bilir: "bu, string-dir" (çünki '...' ilə yazılıb)
// ad = 5                // XƏTA: artıq "string" olduğu bilinən dəyişənə rəqəm verə bilməzsiniz
```
Bu layihədə, dəyişənin tipi AÇIQ-AŞKAR GÖRÜNMÜRSƏ (`const x = ...` kimi, heç bir `: TipAdı` yoxdursa), demək TypeScript onu ÖZÜ, sağ tərəfdəki dəyərdən, avtomatik "çıxarıb" (infer edib).

### `interface` və `type` — "bu obyektin FORMASI belədir"

Bu, TypeScript-in ƏN ÇOX İSTİFADƏ OLUNAN xüsusiyyətidir — BİR OBYEKTİN HANSI SAHƏLƏRƏ (VƏ HANSI TİPLƏRDƏ) MALİK OLDUĞUNU TƏSVİR EDİR.

```ts
interface Category {
  id: number
  name: string
  description: string
  imageUrl: string
}

const kateqoriya: Category = {
  id: 1,
  name: 'İçkilər',
  description: 'Sərinləşdirici içkilər',
  imageUrl: '',
}
// kateqoriya.name = 5   // XƏTA: `name` STRING olmalıdır, rəqəm YOX
// kateqoriya.qiymet = 10  // XƏTA: `Category`-nin BELƏ bir sahəsi YOXDUR
```
`interface Category { ... }` — "`Category` adlı bir FORMA TƏYİN EDİRƏM: `id` rəqəm olmalıdır, `name` string olmalıdır" və s. Sonra `const kateqoriya: Category = {...}` yazanda, TypeScript bu obyektin DƏQİQ bu formaya UYĞUN olduğunu YOXLAYIR.

**`type` nədir, `interface`-dən FƏRQİ nədir?** Bu layihədə HƏR İKİSİ İSTİFADƏ OLUNUR:
```ts
type BadgeColor = 'green' | 'blue' | 'amber' | 'purple' | 'red'   // AŞAĞIDA "union" bölməsinə baxın
type StatusCounts = { TOTAL: number } & Partial<Record<OrderStatus, number>>  // AŞAĞIDA izah olunur
```
Praktik fərq: `interface` YALNIZ OBYEKT FORMASI təsvir edir (VƏ sonradan `extends` ilə GENİŞLƏNDİRİLƏ bilər), `type` isə İSTƏNİLƏN NÖV tip verə bilər — OBYEKT, UNION (aşağıda), YA DA sadəcə bir "ləqəb" (`type ID = number` kimi). Bu layihədə **qayda belədir**: obyekt formaları (API cavabları, komponent prop-ları) `interface` ilə, hər şey başqası (union-lar, kəsişmələr) `type` ilə yazılır — məhz bunu görəcəksiniz `src/types/` qovluğunda.

### `?` — "bu sahə OLA da bilər, OLMAYA da"

```ts
interface ButtonProps {
  variant?: string   // '?' OLMASA idi: HƏR YERDƏ <Button> işlədəndə MÜTLƏQ variant VERMƏLİ idiniz
  children: string   // '?' YOXDUR — bu sahə MÜTLƏQDİR, verilməsə XƏTA
}
```
`variant?: string` — "bu sahə YA STRİNGDİR, YA DA TAMAMİLƏ VERİLMƏYƏ BİLƏR (`undefined`)". Bu layihədə, demək olar HƏR yerdə "default dəyəri OLAN" prop-lar (`variant = 'solid'` kimi) `?` ilə işarələnir — çünki çağıran tərəf onu VERMƏSƏ DƏ, default dəyər onsuz da işə düşəcək.

### Union tiplər (`|`) — "bu, YA BU, YA DA O ola bilər"

```ts
type Ölçü = 'sm' | 'lg'                 // YALNIZ bu iki mətndən BİRİ ola bilər, BAŞQA HEÇ NƏ
type İD = number | string               // YA rəqəm, YA DA mətn ola bilər
type Nəticə = Category | null           // YA Category formasında obyekt, YA DA `null`

function seç(ölçü: Ölçü) { ... }
seç('sm')     // OK
seç('lg')     // OK
seç('md')     // XƏTA: 'md' bu union-un İÇİNDƏ YOXDUR
```
Bu, TypeScript-in "enum" (sabit siyahı) YAZMAĞIN ən çox işlədilən üsuludur. Bu layihədə, MƏSƏLƏN, sifariş statusları belə təyin olunub:
```ts
// lib/constants/orderStatus.ts-də, ETIKET obyektindən AVTOMATİK törədilir (aşağıda izah olunur):
type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED'
```
Yəni, `status` dəyişəni İSTƏNİLƏN mətn DEYİL, YALNIZ bu 6 mətndən BİRİ ola bilər — səhvən `status = 'PENDINGG'` (əlavə "G") yazsanız, TypeScript DƏRHAL tutar.

### `&` (intersection) — "bu tiplərin HAMISI BİRLİKDƏ"

`|` (union) "YA BU YA DA O" demək olduğu halda, `&` (intersection) "HƏR İKİSİ EYNİ ANDA" deməkdir — iki (və ya daha çox) tipin BÜTÜN sahələrini BİRLƏŞDİRİR:
```ts
type A = { x: number }
type B = { y: string }
type AB = A & B   // { x: number, y: string } — İKİSİNİN DƏ sahələri MÜTLƏQ olmalıdır
```
Bu layihədə, `Orders.tsx`-də BELƏ İSTİFADƏ OLUNUR:
```ts
type StatusCounts = { TOTAL: number } & Partial<Record<OrderStatus, number>>
```
Oxunuşu: "`StatusCounts`, HƏM `{ TOTAL: number }` (yəni `TOTAL` sahəsi MÜTLƏQ var VƏ rəqəmdir), HƏM DƏ `Partial<Record<OrderStatus, number>>` (aşağıda izah olunur — HƏR statusun sayını, AMMA OPSİONAL şəkildə saxlaya bilən bir obyekt)". Bunun NİYƏ belə yazıldığı Hissə 18-də (`Orders.tsx`-in izahında) ətraflı göstərilir.

### Generic-lər (`<T>`) — "İSTƏNİLƏN TİP ÜÇÜN İŞLƏYƏN funksiya/tip"

Bu, İLK BAXIŞDA ƏN ÇƏTİN görünən mövzudur, AMMA məntiqi SADƏDİR: bəzən bir funksiya YA DA TİP, "hansı NÖV data ilə işlədiyindən ASILI OLMAYARAQ" EYNİ ŞƏKİLDƏ İŞLƏMƏLİDİR. Generic — bunun üçün bir "DƏYİŞƏN TİP ADI"DIR (adətən `T` hərfi işlədilir, "Type"-ın qısaldılmışı).

**Çox sadə bir misal:**
```ts
function birinci<T>(massiv: T[]): T {
  return massiv[0]
}

birinci([1, 2, 3])           // T = number OLARAQ İŞLƏYİR, NƏTİCƏ: number
birinci(['a', 'b', 'c'])     // T = string OLARAQ İŞLƏYİR, NƏTİCƏ: string
birinci([{id: 1}, {id: 2}])  // T = {id: number} OLARAQ İŞLƏYİR
```
`<T>` — "bu funksiya, İSTƏNİLƏN TİPLƏ (`T` adlandırırıq) İŞLƏYƏ BİLƏR, AMMA HANSI TİPLƏ ÇAĞIRILSA, NƏTİCƏ DƏ EYNİ TİPDƏN OLACAQ" deməkdir. `birinci([1,2,3])` çağıranda, TypeScript ÖZÜ görür ki, massivin elementləri `number`-dir, deməli `T = number`, DEMƏLİ NƏTİCƏ DƏ `number` olmalıdır (`string` YOX).

**Bu layihədə əsl istifadə — `usePagination`:**
```ts
export function usePagination<T>(items: T[], initialPageSize = 5) {
  // ... (aşağıda tam izah olunur)
  return { page, setPage, pageSize, setPageSize, paged }
  // `paged` da T[] TİPİNDƏDİR
}
```
Bu hook, Kateqoriyalar səhifəsində `usePagination(filtered)` (burada `filtered: Category[]`) ÇAĞIRILANDA `T = Category` olur, İstifadəçilər səhifəsində isə `usePagination(filtered)` (`filtered: User[]`) ÇAĞIRILANDA `T = User` olur — **EYNİ FUNKSİYA, HƏR İKİ SƏHİFƏDƏ İŞLƏYİR**, AMMA hər dəfə "TAM DOĞRU" tiplə (`paged` nəticəsi Kateqoriyalar səhifəsində `Category[]`, İstifadəçilər səhifəsində `User[]` OLUR — QARIŞMIR).

**Niyə bu vacibdir?** Generic OLMASAYDI, YA HƏR SƏHİFƏ ÜÇÜN AYRI bir `usePaginationCategories`, `usePaginationUsers` YAZMALI OLARDIQ (TƏKRARÇILIQ), YA DA `paged`-i "İSTƏNİLƏN TİP OLA BİLƏR" (`any`, AŞAĞIDA İZAH OLUNUR) EDİB TİP TƏHLÜKƏSİZLİYİNİ TAMAMİLƏ İTİRƏRDİK. Generic HƏR İKİSİNİN ORTASI — BİR FUNKSİYA, AMMA HƏR ÇAĞIRIŞDA DÜZGÜN TİPLƏ.

**Bu layihədə generic olan YERLƏR (CƏMİ 5 YER, BAŞQA HEÇ YERDƏ YOXDUR — BİLƏRƏKDƏN BELƏ SAXLANILIB):**
- `usePagination<T>` — istənilən siyahını səhifələmək üçün.
- `useCrudModal<TItem, TForm>` — İKİ AYRI GENERİK (`TItem` — siyahı elementi, `TForm` — forma) — çünki BUNLAR FƏRQLİ FORMALARDIR (məs. `Product` VƏ `ProductForm` fərqlidir, aşağıda görəcəksiniz).
- `useDebounce<T>` — İSTƏNİLƏN TİPDƏ bir dəyəri "gecikdirmək" üçün (adətən `string`, amma prinsipcə hər şey ola bilər).
- `api.get<T>()`, `api.post<T>()` və s. (`axiosInstance.ts`-də) — "bu sorğunun CAVABI HANSI FORMADADIR" demək üçün, HƏR SERVİS FAYLINDA FƏRQLİ `T` İLƏ ÇAĞIRILIR.

### `unknown` və `any` — "tipini bilmirəm" ÜÇÜN İKİ FƏRQLİ YANAŞMA

**`any`** — "bu dəyərin İSTƏNİLƏN TİPDƏ OLA BİLƏCƏYİNİ" bildirir VƏ TypeScript-ə "BUNU ARTIQ YOXLAMA, MƏNƏ ETİBAR ET" deyir. **BU LAYİHƏDƏ `any` YAZILMASI QADAĞANDIR** (`.oxlintrc.json`-da `typescript/no-explicit-any: error` qaydası İLƏ MƏCBURİ EDİLİR) — çünki `any` yazan kimi, TypeScript O DƏYİŞƏN ÜÇÜN BÜTÜN YOXLAMALARI DAYANDIRIR, YƏNİ TypeScript-in BÜTÜN FAYDASINI SIFIRLAYIRSINIZ.

**`unknown`** — BU DA "tipini BİLMİRƏM" DEMƏKDİR, AMMA `any`-DƏN FƏRQLİ OLARAQ, TypeScript SİZƏ O DƏYƏRİ İSTİFADƏ ETMƏZDƏN ƏVVƏL **MÜTLƏQ YOXLAMA** ("bu, DOĞRUDAN DA bu tipdəndir?") TƏLƏB EDİR:
```ts
function məlumatıGöstər(dəyər: unknown) {
  console.log(dəyər.toUpperCase())  // XƏTA: `dəyər`-in `toUpperCase()` METODU olduğunu HƏLƏ BİLMİRİK

  if (typeof dəyər === 'string') {
    console.log(dəyər.toUpperCase())  // OK İNDİ — YOXLAMADAN SONRA, TypeScript "bu, DOĞRUDAN DA string-dir" DEYƏ QƏBUL EDİR
  }
}
```
Bu, **"daraltma" (narrowing)** adlanır — `if (typeof ... === '...')` KİMİ BİR YOXLAMA İLƏ, `unknown`-u DAHA DƏQİQ BİR TİPƏ "DARALDIRSINIZ".

**Bu layihədə `unknown` DƏQİQ 3 YERDƏ var, BAŞQA HEÇ YERDƏ YOXDUR:**

1. **`catch (err)` bloklarında** — TypeScript-də, `catch`-ə düşən `err` HƏMİŞƏ AVTOMATİK `unknown`-dır (çünki JavaScript-də İSTƏNİLƏN DƏYƏR "atıla" (throw) bilər — `throw 'sadə mətn'` da, `throw {obyekt: 1}` da mümkündür, ona görə TypeScript "bu, MÜTLƏQ `Error` OLACAQ" DEYƏ FƏRZ ETMİR). Ona görə HƏR yerdə BELƏ YAZILIB:
```ts
try {
  await login(phone, password)
} catch (err) {
  toast.error(err instanceof Error ? err.message : 'Xəta baş verdi')
}
```
`err instanceof Error` — "`err` HƏQİQƏTƏN bir `Error` OBYEKTİDİRMİ?" YOXLAYIR (DARALDIR). DOĞRUDURSA, `err.message`-ə TƏHLÜKƏSİZ MÜRACİƏT EDƏ BİLİRİK (çünki İNDİ TypeScript "bu, `Error`-DUR, `.message` SAHƏSİ MÖVCUDDUR" DEYƏ BİLİR). YANLIŞDIRSA (nadir hal), ÜMUMİ bir mesaj göstərilir. **Bu layihədə `axiosInstance.ts` HƏMİŞƏ sadə bir `Error` OBYEKTİ "ATIR"** (aşağıda Hissə 9-da izah olunur), ona görə praktikada BU YOXLAMA HƏMİŞƏ DOĞRU ÇIXIR, AMMA TypeScript BUNU "BİLMİR" (bunu BİLMƏSİ ÜÇÜN "runtime yoxlama" — YƏNİ KODUN ÖZÜNDƏ BELƏ BİR `instanceof` YAZILMASI — LAZIMDIR).

2. **`JSON.parse`-in nəticəsində** (`lib/auth/session.ts`-də):
```ts
export function getStoredProfile(): Profile | null {
  const raw = localStorage.getItem(PROFILE_KEY)
  return raw ? (JSON.parse(raw) as Profile) : null
}
```
`JSON.parse(...)` — brauzerin ÖZ FUNKSİYASIDIR, o, mətni obyektə çevirir, AMMA TypeScript "bu obyektin DƏQİQ FORMASI NƏDİR" bilə BİLMƏZ (çünki mətn İSTƏNİLƏN ŞEY OLA BİLƏR). Ona görə `as Profile` YAZILIB (AŞAĞIDA "`as`" bölməsinə baxın) — "buna ETİBAR ET, bu, `Profile` FORMASINDADIR" DEYİRİK, çünki BU KODUN ÖZÜ (`saveSession` funksiyası) `localStorage`-a MƏHZ BU FORMANI YAZIR, BAŞQA HEÇ NƏ.

3. **`axiosInstance.ts`-də, server cavabı ENVELOPE-DAN (zərfdən) ÇIXARILMAZDAN ƏVVƏL** — aşağıda Hissə 9-da ətraflı izah olunur.

**Qısa QAYDA:** `any` — HEÇ VAXT yazmayın (VƏ layihə buna YOL VERMİR). `unknown` — YALNIZ yuxarıdakı 3 həqiqi sərhəddə görəcəksiniz, VƏ hər dəfə istifadədən ƏVVƏL bir YOXLAMA (`instanceof`, `typeof`, YA DA `as` — sənədləşdirilmiş halda) VAR.

### `as` — "tip assersiyası" (məcburi çevirmə)

```ts
const dəyər = JSON.parse(raw) as Profile
const status = e.target.value as OrderStatus
```
`as TipAdı` — TypeScript-ə "MƏN BU DƏYƏRİN HANSI TİPDƏ OLDUĞUNU SƏNDƏN DAHA YAXŞI BİLİRƏM, BUNA ETİBAR ET" DEYİR. **DİQQƏT:** bu, HEÇ BİR RUNTIME (KODUN İŞLƏMƏ ANINDA) YOXLAMA ETMİR — sadəcə TypeScript-in COMPILE VAXTI (KODU YAZARKƏN) yoxlamasını "SUSDURUR". Ona görə `as` YALNIZ SİZ DOĞRUDAN DA ƏMİN OLDUĞUNUZ yerlərdə işlədilməlidir (VƏ bu layihədə İSTİFADƏ OLUNAN HƏR `as` ÜÇÜN, YAXINLIQDA BİR ŞƏRH VAR — NİYƏ TƏHLÜKƏSİZ OLDUĞUNU İZAH EDƏN).

**Bu layihədə `as` harada işlədilir:**
- `JSON.parse(raw) as Profile` (yuxarıda izah olundu).
- `e.target.value as OrderStatus` / `as ProductType` — HTML `<select>` elementinin `onChange`-i HƏMİŞƏ `string` QAYTARIR (HƏTTA `<option>`-ların dəyərləri `OrderStatus` KİMİ MƏHDUD OLSA BELƏ, BROWSER BUNU BİLMİR), AMMA BİZ BİLİRİK Kİ, seçilə BİLƏN YEGANƏ dəyərlər MƏHZ `ORDER_STATUS_OPTIONS`/`PRODUCT_TYPE_OPTIONS`-DAKI dəyərlərdir (çünki `<option>`-lar MƏHZ bu siyahıdan qurulur) — ona görə `as OrderStatus` TƏHLÜKƏSİZDİR.
- `api as unknown as UnwrappedApi` (`axiosInstance.ts`-də, YALNIZ BİR YERDƏ) — Hissə 9-da ƏTRAFLI izah olunur, LAYİHƏDƏKİ ƏN "MÜRƏKKƏB" tip yazısıdır, AMMA NİYƏ LAZIM OLDUĞU sadə bir səbəbə əsaslanır.

**`as unknown as X` NİYƏ İKİ DƏFƏ `as`?** Bəzən İKİ TİP BİR-BİRİLƏ "STRUKTURCA" ÇOX FƏRQLİDİR (TypeScript "bunlar ƏSLA EYNİ ŞEY OLA BİLMƏZ" DEYİR VƏ BİRBAŞA `as`-A İCAZƏ VERMİR) — BELƏ HALDA, ƏVVƏLCƏ `as unknown` (HƏR ŞEYƏ ÇEVRİLƏ BİLƏN "NEYTRAL" TİP) EDİB, SONRA ORADAN HƏDƏF TİPƏ (`as UnwrappedApi`) ÇEVİRİRİK — İKİ ADDIMLI "MƏCBURİ KÖRPÜ". Bu, LAYİHƏDƏ **CƏMİ BİR DƏFƏ** İŞLƏDİLİB, VƏ BİLƏRƏKDƏN BAŞQA HEÇ YERDƏ TƏKRARLANMAYIB.

### `satisfies` — "`as`-a BƏNZƏYİR, AMMA TƏHLÜKƏSİZDİR"

```ts
<Outlet context={{ search: debouncedSearch } satisfies LayoutOutletContext} />
```
`dəyər satisfies TipAdı` — "bu dəyərin `TipAdı`-NA UYĞUN OLDUĞUNU YOXLA, AMMA (`as`-dan FƏRQLİ OLARAQ) dəyərin ÖZ DƏQİQ TİPİNİ (`{search: string}` kimi) DƏYİŞDİRMƏ". Fərq incədir: `as` "MƏNƏ ETİBAR ET, YOXLAMA" deyir, `satisfies` isə "BUNU YOXLA (VƏ SƏHVSƏ XƏTA VER), AMMA NƏTİCƏNİ ÖZ HALINDA BURAX" deyir — YƏNİ `satisfies` DAHA TƏHLÜKƏSİZDİR, ÇÜNKİ HƏQİQİ BİR YOXLAMA APARIR (AS ISƏ HEÇ BİR YOXLAMA APARMIR, SADƏCƏ "SUSDURUR"). Bu layihədə `AdminLayout.tsx`-də, `Outlet`-ə ÖTÜRÜLƏN OBYEKTİN DƏQİQ `{search: string}` FORMASINDA OLDUĞUNU TƏSDİQLƏMƏK ÜÇÜN İŞLƏDİLİB.

### `Record<Açar, Dəyər>` — "bu açarlarla bu tipdə dəyərlər olan obyekt"

```ts
type Rənglər = Record<'yaşıl' | 'qırmızı', string>
// yuxarıdakı, AŞAĞIDAKI İLƏ EYNİ MƏNADADIR:
type Rənglər2 = { yaşıl: string; qırmızı: string }

const r: Rənglər = { yaşıl: '#00ff00', qırmızı: '#ff0000' }
```
`Record<K, V>` — "AÇARLARI `K` TİPİNDƏN, DƏYƏRLƏRİ `V` TİPİNDƏN OLAN bir OBYEKT" DEMƏKDİR. Bu layihədə, MƏSƏLƏN:
```ts
export const ORDER_STATUS_BADGE_COLOR: Record<OrderStatus, BadgeColor> = {
  PENDING: 'amber',
  CONFIRMED: 'blue',
  // ... (HƏR statusun BİR rəngi OLMALIDIR — TypeScript, HANSISA statusun ÇATIŞMADIĞINI BELƏ TUTUR!)
}
```
Bunun FAYDASI: `Record<OrderStatus, BadgeColor>` YAZDIQDAN SONRA, ƏGƏR `orderStatus.ts` FAYLINA YENİ BİR STATUS (MƏS. `"REFUNDED"`) ƏLAVƏ EDİLSƏ, AMMA `ORDER_STATUS_BADGE_COLOR`-A O STATUSUN RƏNGİ ƏLAVƏ EDİLMƏSƏ, TypeScript DƏRHAL XƏTA VERƏCƏK ("`REFUNDED` sahəsi ÇATIŞMIR") — YƏNİ YENİ STATUS ƏLAVƏ EDƏNDƏ, "UNUTMAQ" MÜMKÜN DEYİL.

### `Partial<X>` və `Pick<X, ...>` — MÖVCUD BİR TİPDƏN YENİ TİP "HASİL ETMƏK"

```ts
interface Profile {
  id: number
  full_name: string
  phone: string
}

type QismənProfile = Partial<Profile>
// = { id?: number; full_name?: string; phone?: string } — HƏR SAHƏ OPSİONAL OLUR

type YalnızAd = Pick<Profile, 'full_name'>
// = { full_name: string } — YALNIZ QEYD OLUNAN SAHƏ(LƏR) GÖTÜRÜLÜR
```
- `Partial<X>` — "`X`-in EYNİ SAHƏLƏRİ, AMMA HAMISI `?` İLƏ, YƏNİ OPSİONAL" DEMƏKDİR. Bu layihədə `orderService.ts`-də İŞLƏDİLİR: `getOrderStats()` SORĞUSUNUN CAVABI `Partial<OrderStats>` TİPİNDƏDİR — ÇÜNKİ BACKEND BƏZƏN BƏZİ SAHƏLƏRİ (MƏS. `CANCELLED`) QAYTARMIR (SƏNƏDLƏŞDİRİLMİŞ BİR BACKEND QÜSURUDUR, `docs/API.md`-yə BAXIN) — `Partial` BU RİYALLIĞI TİPİN ÖZÜNDƏ ƏKS ETDİRİR, YƏNİ "BU SAHƏLƏR OLA DA BİLƏR, OLMAYA DA" DEYİR, PROQRAMÇI BUNU UNUDA BİLMƏZ.
- `Pick<X, 'sahə1' | 'sahə2'>` — "`X`-DƏN YALNIZ BU SAHƏLƏRİ SEÇ" DEMƏKDİR. Bu layihədə `CategoryPayload` BELƏ TƏYİN OLUNUB:
```ts
export type CategoryPayload = Pick<CategoryApi, 'name' | 'description' | 'img_url'>
```
Oxunuşu: "`CategoryPayload`, `CategoryApi`-NİN YALNIZ `name`, `description`, `img_url` SAHƏLƏRİDİR" — ÇÜNKİ SERVERƏ YENİ KATEQORİYA YARADANDA `id`/`created_at` KİMİ SAHƏLƏRİ GÖNDƏRMİRİK (ONLARI SERVERİN ÖZÜ YARADIR), YALNIZ BU ÜÇÜNÜ.

### `keyof typeof` — "bu OBYEKTİN AÇARLARINDAN bir UNION TİP DÜZƏLT"

Bu, İLK BAXIŞDA QƏLİZ GÖRÜNSƏ DƏ, ÇOX FAYDALI bir TRİKDİR — bu layihədə `OrderStatus` VƏ `ProductType` TİPLƏRİ MƏHZ BELƏ YARADILIB:
```ts
export const ORDER_STATUS_LABELS = {
  PENDING: 'Gözləyir',
  CONFIRMED: 'Təsdiqləndi',
  PREPARING: 'Hazırlanır',
  READY: 'Hazırdır',
  DELIVERED: 'Çatdırıldı',
  CANCELLED: 'Ləğv edildi',
} as const   // AŞAĞIDA "as const" izah olunur

export type OrderStatus = keyof typeof ORDER_STATUS_LABELS
// NƏTİCƏ: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED'
```
`typeof ORDER_STATUS_LABELS` — "BU OBYEKTİN TİPİNİ MƏNƏ VER" (YƏNİ, DƏYƏRİN ÖZÜNÜ YOX, ONUN FORMASINI). `keyof ...` — "BU TİPİN BÜTÜN AÇARLARINI (KEY-LƏRİNİ) BİR UNION KİMİ VER". NƏTİCƏDƏ: `OrderStatus` AVTOMATİK OLARAQ `ORDER_STATUS_LABELS` OBYEKTİNİN 6 AÇARINDAN İBARƏT BİR UNION TİPİ OLUR.

**BUNUN NİYƏ VACİB OLDUĞU:** Əgər `OrderStatus`-U AYRICA, ƏL İLƏ YENİDƏN YAZSAYDIQ (`type OrderStatus = 'PENDING' | 'CONFIRMED' | ...`), İKİ YERDƏ (HƏM ETİKETLƏR OBYEKTİNDƏ, HƏM DƏ TİPDƏ) EYNİ SİYAHINI SAXLAMALI OLARDIQ — BİRİNİ YENİLƏYİB O BİRİNİ UNUTSAQ, SƏSSİZ (XƏBƏRDARLIQSIZ) BİR UYĞUNSUZLUQ YARANARDI. `keyof typeof` İLƏ, TİP AVTOMATİK OLARAQ ETİKETLƏR OBYEKTİNDƏN "TÖRƏYİR" — TƏK BİR MƏNBƏ (`ORDER_STATUS_LABELS`) VAR, TİP ONU SADƏCƏ "GÜZGÜLƏYİR".

### `as const` — "bu dəyəri, DƏQİQ YAZILDIĞI KİMİ, DƏYİŞMƏZ SAXLA"

```ts
const adiObyekt = { kg: 'Kiloqram', gr: 'Qram' }
// TypeScript BUNU BELƏ GÖRÜR: { kg: string; gr: string } — YƏNİ "kg" SAHƏSİ İSTƏNİLƏN string OLA BİLƏR

const sabitObyekt = { kg: 'Kiloqram', gr: 'Qram' } as const
// TypeScript BUNU BELƏ GÖRÜR: { readonly kg: 'Kiloqram'; readonly gr: 'Qram' } — YƏNİ "kg" SAHƏSİ
// MƏHZ "Kiloqram" MƏTNİDİR (İSTƏNİLƏN STRING YOX) VƏ DƏYİŞDİRİLƏ BİLMƏZ (`readonly`)
```
`as const` OLMADAN, YUXARIDAKI `keyof typeof` TRİKİ İŞLƏMƏZDİ — ÇÜNKİ TypeScript "kg" SAHƏSİNİN DƏYƏRİNİ "İSTƏNİLƏN STRING" (GENİŞ TİP) KİMİ GÖRSƏYDİ, "AÇARLARI ÇIXAR" (`keyof`) ETSƏK BELƏ, DƏYƏRLƏR HAQQINDA HEÇ NƏ DƏYİŞMƏZDİ (AMMA BİZƏ LAZIM OLAN, MƏHZ AÇARLARIN ÖZÜDÜR, ONA GÖRƏ BU KONKRET HALDA ƏSAS FAYDA BAŞQA YERDƏDİR: `as const` OLMASA, OBYEKTİN SAHƏLƏRİ "DƏYİŞDİRİLƏ BİLƏN" SAYILAR, BU İSƏ BƏZİ SIXI TİP YOXLAMALARINDA PROBLEM YARADAR). QISASI: BU LAYİHƏDƏ, "ETİKET" OBYEKTLƏRİNİN (`ORDER_STATUS_LABELS`, `PRODUCT_TYPE_LABELS`) SONUNA HƏMİŞƏ `as const` YAZILIB — BUNU BİR "RİTUAL" KİMİ QƏBUL EDƏ BİLƏRSİNİZ: "MƏN BU OBYEKTİ SABİT BİR LÜĞƏT KİMİ İSTİFADƏ EDƏCƏYƏM, ONDAN TİP TÖRƏDƏCƏYƏM".

### `import type` / `export type` — "YALNIZ TİP ÜÇÜN idxal/ixrac"

```ts
import { useState } from 'react'                    // ADİ idxal — RUNTIME-da (kodun İŞLƏMƏ ANINDA) LAZIMDIR
import type { ReactNode } from 'react'               // TİP idxalı — YALNIZ TypeScript YOXLAMASI ÜÇÜN, KODUN
                                                       // ÖZÜNDƏ (brauzerdə) HEÇ BİR İZİ QALMIR, TAMAMİLƏ "SİLİNİR"
```
`type` açar sözü — İDXAL/İXRAC OLUNAN ŞEYİN YALNIZ BİR TİP (`interface`, `type`) OLDUĞUNU, RUNTIME-DA MÖVCUD OLMAYAN bir şey OLDUĞUNU bildirir. Bu VACİBDİR, ÇÜNKİ Vite KODU FAYL-FAYL, BİR-BİRİNDƏN ASILI OLMADAN "TƏRCÜMƏ" (transpile) EDİR — ƏGƏR `import type` YAZILMASA, Vite BƏZƏN "BU, RUNTIME-DA LAZIM OLAN BİR ŞEYDİR" DEYƏ SƏHVƏN DÜŞÜNƏ BİLƏR. Bu layihədə `tsconfig.json`-da `verbatimModuleSyntax: true` AYARI VAR — YƏNİ, ƏGƏR SİZ TİP İDXAL EDİB `import type` YAZMASANIZ, TypeScript BUNU **XƏTA** SAYIR (SADƏCƏ TÖVSİYƏ DEYİL, MƏCBURİDİR).

**Necə BİLİRİK NƏ VAXT `import type` YAZMALI?** ƏGƏR GƏTİRDİYİNİZ ŞEY BİR `interface`/`type`-DIRSA (MƏS. `Category`, `LayoutOutletContext`), `import type` YAZIN. ƏGƏR BİR FUNKSİYA/DƏYƏR/KOMPONENTDİRSƏ (MƏS. `useState`, `Button`), ADİ `import` YAZIN. BƏZƏN İKİSİ QARIŞIQ OLUR:
```ts
import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
```

### Funksiya tipləri (`(param: Tip) => QaytarılanTip`)

```ts
interface ButtonProps {
  onClick?: () => void                    // parametrsiz funksiya, HEÇ NƏ qaytarmır
  onSearchChange?: (value: string) => void // BİR string parametri alır, HEÇ NƏ qaytarmır
}
```
`() => void` — "BU, BİR FUNKSİYADIR, PARAMETRİ YOXDUR, VƏ HEÇ NƏ (`void`) QAYTARMIR" DEMƏKDİR. `void` — "BU FUNKSİYANIN QAYTARDIĞI DƏYƏRDƏN İSTİFADƏ ETMƏYƏCƏYİK" MƏNASINDADIR (`undefined`-DƏN FƏRQLİ OLARAQ, DAHA "NİYYƏT BİLDİRƏN" BİR TİPDİR). Bu layihədə HƏR `onClick`, `onChange`, `onView` VƏ S. KİMİ "CALLBACK" (GERİ ÇAĞIRIŞ) PROP-LARI BELƏ TİPLƏNİR.

### Class-larda `override` açar sözü

```ts
class ErrorBoundary extends Component<Props, State> {
  override state: State = { hasError: false }
  override componentDidCatch(error: Error, info: ErrorInfo) { ... }
  override render() { ... }
}
```
`extends Component` — "`ErrorBoundary`, React-ın ÖZ `Component` SİNFİNDƏN MİRAS ALIR" DEMƏKDİR (Hissə 2-də QEYD OLUNUB). `override` — "MƏN BURADA, VALİDEYN SİNİFDƏ (`Component`) ARTIQ MÖVCUD OLAN BİR ÜZVÜ (`state`, `componentDidCatch`, `render`) BİLƏRƏKDƏN YENİDƏN TƏYİN EDİRƏM" DEMƏKDİR. Bunsuz da kod İŞLƏYƏRDİ, AMMA `tsconfig.json`-DA `noImplicitOverride: true` AYARI VAR — TypeScript-Ə "ƏGƏR BİR ÜZV DOĞRUDAN DA VALİDEYNDƏ VARSA, `override` YAZILMASINI MƏCBUR ET" DEYİR. **FAYDASI:** GƏLƏCƏKDƏ React ÖZ `Component` SİNFİNDƏN `componentDidCatch` ADLI ÜZVÜ SİLSƏ (VƏ YA ADINI DƏYİŞSƏ), SİZİN `override componentDidCatch` SƏTRİNİZ DƏRHAL XƏTA VERƏR ("BELƏ BİR ÜZV VALİDEYNDƏ YOXDUR") — YƏNİ "SƏSSİZ" (XƏBƏRDARLIQSIZ) BİR UYĞUNSUZLUQ YARANMIR.

### `ComponentPropsWithRef<'button'>` — HTML elementinin BÜTÜN "təbii" prop-larını "miras almaq"

```ts
interface ButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: 'solid' | 'outline' | 'ghost' | 'ghostDanger'
  icon?: IconComponent
}
```
`ComponentPropsWithRef<'button'>` — React-IN ÖZ TİPİDİR, "ADİ HTML `<button>` ELEMENTİNİN QƏBUL ETDİYİ BÜTÜN PROP-LARI" (`onClick`, `disabled`, `type`, `className`, HƏTTA `ref` DAXİL — AŞAĞIDA İZAH OLUNUR) TƏMSİL EDİR. `interface ButtonProps extends ComponentPropsWithRef<'button'>` — "`ButtonProps`, BUNLARIN HAMISINI DA DAXİL EDİR, ÜSTÜNƏ ÖZ ƏLAVƏ PROP-LARIMIZI (`variant`, `icon`) DA QOŞUR" DEMƏKDİR. `extends` BURADA (YUXARIDAKI `class ... extends Component`-DƏN FƏRQLİ OLARAQ) "GENİŞLƏNDİRMƏ" MƏNASINDADIR — `interface`-lər ÜÇÜN, "BU FORMA, O FORMANIN BÜTÜN SAHƏLƏRİNİ DƏ EHTİVA EDİR" DEMƏKDİR.

**NİYƏ BU LAZIM OLDU?** `ConfirmModal.tsx`, `Button` KOMPONENTİNƏ `ref={cancelBtnRef}` VERİR (FOKUSLAMAQ ÜÇÜN, Hissə 14-də İZAH OLUNUR). `ref` XÜSUSİ BİR PROP-DUR (ADİ PROP-LAR KİMİ SƏRBƏST İSTİFADƏ OLUNA BİLMİR) — ONU `ButtonProps`-A ƏLAVƏ ETMƏK ÜÇÜN, ƏN SADƏ YOL, `ComponentPropsWithRef<'button'>`-DAN "MİRAS ALMAQ"DIR (React 19-da BU, ARTIQ `forwardRef` ADLI ƏLAVƏ BİR SARĞI YAZMADAN İŞLƏYİR).

### `declare module` — "kənar bir kitabxananın TİPLƏRİNƏ ƏLAVƏ EDİRƏM"

```ts
// src/types/api.ts-də:
import 'axios'
declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuthRetry?: boolean
    _retry?: boolean
  }
}
```
`declare module 'axios' { ... }` — "`axios` PAKETİNİN ÖZÜNÜN TİPLƏRİNƏ (BİZ YAZMAMIŞIQ, KİTABXANANIN ÖZÜ TƏMİN EDİR) ƏLAVƏ SAHƏLƏR ƏLAVƏ EDİRƏM" DEMƏKDİR. Bu, **"MODUL AUGMENTATION" (MODUL GENİŞLƏNDİRMƏSİ)** ADLANIR — LAYİHƏNİN ƏN QABAQCIL TİP-YAZMA TRİKİDİR, AMMA SƏBƏBİ SADƏDİR: `axiosInstance.ts`-DƏ, HƏR SORĞU KONFİQURASİYASINA (`config` OBYEKTİNƏ) ÖZ XÜSUSİ SAHƏLƏRİMİZİ (`skipAuthRetry`, `_retry`) ƏLAVƏ EDİRİK (Hissə 9-da İZAH OLUNUR), AMMA `axios` PAKETİNİN ÖZÜ BU SAHƏLƏRİ TANIMIR (ÇÜNKİ BUNLAR BİZİM ÖZ İCADIMIZDIR). `declare module` OLMASA, `config.skipAuthRetry` YAZANDA TypeScript "AXIOS-UN BELƏ BİR SAHƏSİ YOXDUR" DEYƏ XƏTA VERƏRDİ. BU BLOK, "AXİOS-UN ÖZ TİPİNƏ, KƏNARDAN, BU İKİ SAHƏNİ ƏLAVƏ EDİRƏM" DEYİR — BUNDAN SONRA BÜTÜN LAYİHƏ BOYU, AXİOS-UN CONFIG OBYEKTLƏRİNDƏ BU İKİ SAHƏ TANINIR.

### `noUncheckedIndexedAccess` — "obyektdən DİNAMİK açarla oxuyanda, TAPILMAMA EHTİMALINI DA GÖSTƏR"

Bu, KODDA GÖRÜNƏN bir SİNTAKSİS DEYİL, `tsconfig.json`-DA AKTİV EDİLƏN bir AYARDIR, AMMA NƏTİCƏSİNİ KODDA HİSS EDİRSİNİZ:
```ts
const ORDER_STATUS_LABELS: Record<OrderStatus, string> = { ... }

function etiket(status: OrderStatus) {
  return ORDER_STATUS_LABELS[status]   // BU AYAR OLMASA: TypeScript DEYƏR "BU, HƏMİŞƏ `string`-DİR"
                                         // BU AYAR VARSA: TypeScript DEYƏR "BU, `string`-DİR, AMMA NƏZƏRİ
                                         // OLARAQ `undefined` DƏ OLA BİLƏR" (BƏZİ HALLARDA)
}
```
Bu AYAR, LOOKUP CƏDVƏLLƏRİNDƏN (`obj[dinamikAçar]` ŞƏKLİNDƏ) OXUYANDA, TypeScript-İ DAHA EHTİYATLI OLMAĞA MƏCBUR EDİR — "BU AÇAR HƏQİQƏTƏN MÖVCUDDURMU?" SUALINI DAHA CİDDİ QƏBUL ETDİRİR. Bu layihədə, BELƏ YERLƏRDƏ ARTIQ `?? ''` (Hissə 2-DƏKİ NULLISH COALESCING) KİMİ MÜDAFİƏLİ YAZI VAR İDİ (TypeScript-Ə KEÇMƏZDƏN ƏVVƏL DƏ), ONA GÖRƏ BU AYAR YENİ HEÇ BİR DƏYİŞİKLİK TƏLƏB ETMƏDİ — SADƏCƏ GƏLƏCƏKDƏ BELƏ BİR MÜDAFİƏNİ SƏHVƏN SİLMƏYİN QARŞISINI ALIR.

### Tip xətası gördükdə NƏ ETMƏLİ

Redaktorda (VÖ Code kimi) bir sətir altında QIRMIZI XƏTT görəndə, ÜZƏRİNƏ SIÇAN GƏTİRSƏNİZ, TypeScript SİZƏ MƏHZ HANSI TİPİN HANSI TİPƏ UYĞUN GƏLMƏDİYİNİ YAZIR. Terminal-da isə:
```
npm run typecheck
```
əmri BÜTÜN layihəni yoxlayıb, HƏR XƏTANI fayl adı + sətir nömrəsi İLƏ SİYAHI ŞƏKLİNDƏ göstərir. **Bu əmr, `npm run build`-DƏN FƏRQLİDİR** — `build` yalnız KODU BROWSER ÜÇÜN "TƏRCÜMƏ" edir, TİP SƏHVLƏRİNƏ BAXMIR BELƏ (Vite-in ÖZÜ tez tərcümə edən, tip yoxlamayan bir alət — `esbuild`/`rolldown` — işlədir); YALNIZ `npm run typecheck` (`tsc --noEmit`) HƏQİQƏTƏN TİPLƏRİ YOXLAYIR.

---

## Hissə 4: Qovluq strukturu

```
src/
├── app/               → Tətbiqin "işə düşmə nöqtəsi" (main.tsx, App.tsx)
├── routes/            → Marşrutlaşdırma (hansı URL-də hansı səhifə, giriş qoruması)
├── layouts/           → Bütün admin səhifələrini əhatə edən "çərçivə" (sidebar + header)
├── components/        → Yalnız layout-a aid komponentlər (Sidebar, Header)
├── pages/
│   ├── Login/          → Giriş səhifəsi (qorunmayıb, hamı görə bilər)
│   ├── NotFound/        → 404 səhifəsi
│   └── protected/      → Login tələb edən 5 səhifə (Orders, Campaigns, Categories, Products, Users)
├── shared/
│   ├── components/     → Hər yerdə təkrar istifadə olunan UI hissələri (Button, Modal, Table, ...)
│   └── hooks/          → Öz hook-larımız (usePagination, useCrudModal, useTitle, useDebounce)
├── types/              → BÜTÜN TypeScript tip tərifləri (bir resurs üçün bir fayl) — Hissə 5-ə baxın
├── services/            → Backend-ə HTTP sorğusu göndərən funksiyalar (axios ilə)
├── store/              → Zustand ilə qlobal state (yalnız auth üçün)
├── lib/
│   ├── adapters/         → API formatını UI formatına (və əksinə) çevirən funksiyalar
│   ├── auth/             → localStorage-da token saxlamaq/oxumaq
│   ├── constants/         → Sabit dəyərlər (enum → Azərbaycan dilində etiket xəritələri)
│   └── queryClient.ts     → TanStack Query-nin konfiqurasiyası
├── utils/              → `Pagination` komponenti və `formatDate` funksiyası
├── assets/             → Şəkillər (SVG-lər)
├── index.css            → Bütün rənglər/ölçülər üçün CSS dəyişənləri (design token-lar)
└── vite-env.d.ts        → Vite-in öz tipləri + `.env` dəyişənlərinin tipi + CSS Modules tipi (Hissə 20-yə baxın)
```

**Ən böyük struktur fərqi (əgər köhnə, JavaScript versiyasını görmüsünüzsə):** `shared/` qovluğunun İÇİNDƏ artıq İKİ ALT-QOVLUQ var — `components/` (bütün görüntülü hissələr) VƏ `hooks/` (görüntüsüz məntiq). Əvvəllər HAMISI birbaşa `shared/`-in İÇİNDƏ İDİ. Bu ayrım, "bu, RENDER OLUNAN bir ŞEYDİRMİ, YOXSA sadəcə MƏNTİQDİRMİ?" sualına görə aparılıb — `Button.tsx` JSX qaytarır (`components/`-a aiddir), `usePagination.ts` isə sadəcə RƏQƏMLƏR/OBYEKTLƏR qaytarır, heç bir JSX YOXDUR (`hooks/`-a aiddir).

---

## Hissə 5: `src/types/` qovluğu

Bu, TAMAMİLƏ YENİ bir qovluqdur — TypeScript-ə keçəndə yaradılıb. İÇİNDƏ HEÇ BİR "İŞLƏYƏN" KOD YOXDUR (heç bir funksiya, heç bir komponent) — YALNIZ `interface`/`type` TƏRİFLƏRİ. Fikirləşin ki, bu, layihənin "LÜĞƏTİDİR": "Kateqoriya DEDİKDƏ NƏ NƏZƏRDƏ TUTULUR, HANSI SAHƏLƏRİ VAR" KİMİ SUALLARIN CAVABI BURADADIR.

**Niyə AYRICA bir qovluqda, məsələn `lib/adapters/`-ın İÇİNDƏ YOX?** Çünki EYNİ TİPƏ (məs. `CategoryApi`) HƏM `lib/adapters/category.ts`, HƏM DƏ `services/categoryService.ts` EHTİYAC DUYUR — İKİSİ DƏ BİR-BİRİNDƏN "TİP ÜÇÜN" ASILI OLMASIN DEYƏ, TİPLƏR NEYTRAL BİR YERƏ (`types/`) QOYULUB.

### Fayllar

- **`common.ts`** — BİRDƏN ÇOX YERDƏ İSTİFADƏ OLUNAN, KİÇİK, "ÜMUMİ" TİPLƏR:
```ts
export type BadgeColor = 'green' | 'blue' | 'amber' | 'purple' | 'red'
export interface Column { key: string; label: ReactNode; width?: number | string }
export type IconComponent = ComponentType<{ size?: number; color?: string }>
export interface LayoutOutletContext { search: string }
```
  - `BadgeColor` — `Badge` KOMPONENTİNİN `color` PROP-U, HƏM DƏ `ORDER_STATUS_BADGE_COLOR`/`productTypeBadgeColor`-UN QAYTARDIĞI DƏYƏR — HAMISI EYNİ 5 RƏNGDƏN BİRİ OLMALIDIR, ONA GÖRƏ TƏK BİR YERDƏ TƏYİN OLUNUB.
  - `Column` — `Table` KOMPONENTİNƏ VERİLƏN `columns` MASSİVİNİN HƏR ELEMENTİNİN FORMASI (Hissə 14-ə BAXIN).
  - `IconComponent` — `Button` VƏ `StatCard`-IN `icon` PROP-U ÜÇÜN — "BU, `lucide-react`-DAN GƏLƏN BİR İKON KOMPONENTİDİR" DEMƏKDİR (`ComponentType<{...}>` — React-IN ÖZ TİPİ, "BU, BİR KOMPONENTDİR, BELƏ PROP-LAR QƏBUL EDİR" DEMƏKDİR).
  - `LayoutOutletContext` — `AdminLayout`-UN `Outlet`-Ə VERDİYİ, HƏR SƏHİFƏNİN `useOutletContext()` İLƏ OXUDUĞU OBYEKTİN FORMASI (Hissə 17-yə BAXIN).

- **`api.ts`** — AXİOS İLƏ ƏLAQƏLİ TİPLƏR (Hissə 9-DA, `axiosInstance.ts` İZAHINDA, BU FAYLIN HƏR SƏTRİ AYRICA GÖSTƏRİLİR).

- **`auth.ts`** — GİRİŞ/PROFİL İLƏ ƏLAQƏLİ TİPLƏR:
```ts
export interface Profile {
  id: number
  full_name: string
  phone: string
  address: string | null
  img_url: string | null
  role: string
  created_at: string
}
export interface AuthTokens { access_token: string; refresh_token: string }
export interface LoginPayload { phone: string; password: string }
export interface LoginResponse { tokens: AuthTokens; profile: Profile }
```
  `string | null` — "BU SAHƏ YA STRİNGDİR, YA DA `null`" (Hissə 3-DƏKİ UNION-A BAXIN) — MƏSƏLƏN `address`, İSTİFADƏÇİ ÜNVAN GİRMƏYİBSƏ, BACKEND-DƏN `null` OLARAQ GƏLİR (BOŞ STRİNG YOX).

- **`category.ts`, `campaign.ts`, `product.ts`, `order.ts`, `user.ts`** — HƏR RESURS ÜÇÜN, EYNİ 4 TİPDƏN İBARƏT BİR "DƏST":
  1. **`XApi`** — BACKEND-DƏN GƏLƏN XAM FORMA (`img_url`, `created_at` KİMİ snake_case SAHƏLƏR, `docs/API.md`-DƏKİ İLƏ BİRƏBİR EYNİ).
  2. **`X`** — UI-NİN İSTİFADƏ ETDİYİ FORMA (`imageUrl`, `date` KİMİ camelCase — `mapXFromApi` FUNKSİYASININ QAYTARDIĞI FORMA).
  3. **`XForm`** — BİR `<Modal>` FORMASININ STATE-DƏ SAXLADIĞI FORMA (ADƏTƏN `X`-Ə OXŞAYIR, AMMA BƏZƏN FƏRQLİDİR — AŞAĞIDA `ProductForm` MİSALI VAR).
  4. **`XPayload`** — SERVERƏ YARATMA/YENİLƏMƏDƏ GÖNDƏRİLƏN FORMA (`mapXToApi`-NİN QAYTARDIĞI, ADƏTƏN `id`/`created_at` KİMİ "SERVERİN ÖZÜ YARATDIĞI" SAHƏLƏR OLMADAN).

**Misal — `product.ts` (ƏN MÜRƏKKƏB OLANI):**
```ts
import type { ProductType } from '@/lib/constants/productTypes'

export interface ProductCategoryShort {
  id: number
  name: string
}

export interface ProductApi {
  id: number
  title: string
  description: string
  price: string
  type: ProductType
  img_url: string
  category: ProductCategoryShort | null
  created_at: string
}

export interface Product {
  id: number
  image: string
  color: string
  imageUrl: string
  name: string
  description: string
  price: string
  type: ProductType
  category: ProductCategoryShort | null
  category_id: number | ''
  date: string
}

export interface ProductForm {
  image: string
  color: string
  imageUrl: string
  name: string
  description: string
  price: string
  // başlanğıcda `number | ''` olur (openCreate bir Product-un category_id-sindən "toxum" götürür),
  // amma <select>-in onChange-i HƏMİŞƏ sadə bir string qaytarır — hər çağırış yerində "as" yazmaq
  // əvəzinə, tipin özü hər ikisini əhatə edəcək qədər genişləndirilib.
  category_id: number | string
  type: ProductType
}

export interface ProductPayload {
  title: string
  description: string
  price: string
  type: ProductType
  img_url: string
  category_id: number
}
```
**BURADA DİQQƏTƏLAYİQ NÖQTƏ:** `Product.category_id: number | ''` İLƏ `ProductForm.category_id: number | string` **FƏRQLİDİR** — BU, TƏSADÜF DEYİL, HƏQİQİ BİR SƏBƏBƏ ƏSASLANIR: `Product` (SİYAHI ELEMENTİ) HƏMİŞƏ `mapProductFromApi`-DƏN GƏLİR, ORADA `category_id` YA RƏQƏMDİR, YA DA (KATEQORİYA YOXDURSA) BOŞ STRİNG `''`. AMMA `ProductForm` (FORMANIN ÖZÜ), İSTİFADƏÇİ `<select>` DROPDOWN-DAN BİR KATEQORİYA SEÇƏNDƏ, HTML-İN ÖZ QAYDASINA GÖRƏ HƏMİŞƏ **SADƏ BİR STRİNG** ALIR (HƏTTA O STRİNG "5" KİMİ RƏQƏMƏ OXŞASA BELƏ) — ONA GÖRƏ FORMANIN TİPİ BUNU DA ƏHATƏ ETMƏLİDİR. **BU, TYPESCRIPT-İN MİQRASİYA ZAMANI TAPDIĞI HƏQİQİ BİR UYĞUNSUZLUQ İDİ** — YƏNİ TYPESCRIPT SADƏCƏ "NƏZƏRİ" BİR MİSAL DEYİL, DOĞRUDAN DA KODUN İÇİNDƏKİ İNCƏ BİR FƏRQİ ÜZƏ ÇIXARDI.

- **`index.ts`** — BÜTÜN YUXARIDAKI FAYLLARDAN, YALNIZ TİPLƏRİ (`export type { ... } from './...'` ŞƏKLİNDƏ) TOPLAYAN "BARREL" (SƏBƏT) FAYLI. Səhifələr, RAHATLIQ ÜÇÜN, TEZ-TEZ BUNDAN İDXAL EDİR (`import type { Category, Product } from '@/types'`); `lib/adapters/`/`services/` İSƏ HƏR DƏFƏ KONKRET RESURS FAYLINDAN İDXAL EDİR (`import type { Category } from '@/types/category'`) — ÇÜNKİ BU FAYLLAR YALNIZ BİR RESURSA AİDDİR, BARREL-DƏN İDXAL ETMƏYİN ƏLAVƏ FAYDASI YOXDUR.

**Enum-lar (`OrderStatus`, `ProductType`) NİYƏ BU QOVLUQDA "TƏYİN" OLUNMUR?** Çünki ONLAR ARTIQ `lib/constants/orderStatus.ts`/`productTypes.ts`-DƏ, `keyof typeof` TRİKİ İLƏ (Hissə 3-Ə BAXIN) MÖVCUDDUR — `types/order.ts`/`product.ts` ONLARI SADƏCƏ **YENİDƏN İXRAC EDİR** (`export type { OrderStatus } from '@/lib/constants/orderStatus'`), TƏKRAR YAZMIR. Bu, "TƏK MƏNBƏ" (single source of truth) PRİNSİPİDİR — STATUS SİYAHISI DƏYİŞƏNDƏ, YALNIZ BİR YERİ (`lib/constants/`) DƏYİŞMƏK KİFAYƏTDİR.

---

## Hissə 6: Giriş nöqtəsi

### `src/app/main.tsx`

Bu, tətbiqin **HƏR ŞEYDƏN ƏVVƏL** işə düşən faylıdır — `index.html` faylı birbaşa bunu `<script>` ilə çağırır.

```tsx
import { createRoot } from 'react-dom/client'
import '@/index.css'
import ErrorBoundary from '@/shared/components/ErrorBoundary/ErrorBoundary'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
)
```

**Sətir-sətir:**
1. `createRoot` — React-ın DOM-a (brauzerin göstərdiyi HTML ağacına) "bağlanmaq" üçün funksiyası.
2. `import '@/index.css'` — bütün qlobal CSS-i (rəng dəyişənləri, font, reset qaydaları) bir dəfə yükləyir. `from` yoxdur çünki bu faylın heç nəyini "adla" gətirmirik, sadəcə CSS-i işə salırıq.
3. `ErrorBoundary` — aşağıda ətraflı izah olunan xüsusi komponent, tətbiqin İSTƏNİLƏN yerində JavaScript xətası baş versə, bütün ekranı "ağappaq boş" etmək əvəzinə səliqəli bir xəta ekranı göstərir.
4. `App` — `./App`-dən (eyni qovluqdan, ona görə `@/` yox, `./` işlədilib) gətirilir. **DİQQƏT:** əvvəllər (JS versiyasında) `'./App.jsx'` YAZILIRDI (fayl uzantısı İLƏ), İNDİ İSƏ SADƏCƏ `'./App'` — TypeScript-lə işləyəndə, uzantını (`.tsx`) YAZMIRIQ, Vite ÖZÜ TAPIR.
5. `document.getElementById('root')` — `index.html`-dəki `<div id="root"></div>` elementini tapır — React BÜTÜN tətbiqi bunun İÇİNƏ "yerləşdirəcək". **`!` işarəsinə diqqət** — bu, TypeScript-in "NON-NULL ASSERTION" (`Hissə 3`-dəki `as`-a BƏNZƏR bir "buna ETİBAR ET" işarəsidir): `getElementById(...)` NƏZƏRİ olaraq `null` DA qaytara bilər (element tapılmasa), AMMA BİZ BİLİRİK Kİ, `index.html`-də BU `<div>` HƏMİŞƏ VAR — `!` İLƏ TypeScript-ə "BU DƏYƏR `null` DEYİL, BUNA ETİBAR ET" DEYİRİK.
6. `createRoot(...).render(...)` — tapılan `<div>`-in içinə `<ErrorBoundary><App/></ErrorBoundary>`-ni RENDER edir (ekrana çıxarır).

**Niyə `<StrictMode>` yoxdur?** React-ın default şablonunda adətən `<StrictMode>` olur (development zamanı bəzi funksiyaları TƏSADÜFƏN İKİ DƏFƏ işə salıb səhvləri tez tapmağa kömək edir). Bu layihədə bilərəkdən çıxarılıb — sadəlik üçün.

**Niyə `ErrorBoundary` `App`-ın İÇİNDƏ deyil, ÇÖLÜNDƏ?** Çünki `App.tsx`-in özündə də (məsələn provider-lərin qurulmasında) nəzəri cəhətdən xəta ola bilər — `ErrorBoundary` ən XARİCDƏ olsa, HƏR ŞEYİ (App-ın özü daxil) əhatə edir.

### `src/app/App.tsx`

```tsx
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { queryClient } from '@/lib/queryClient'
import AppRoutes from '@/routes/AppRoutes'

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </QueryClientProvider>
  )
}
```

**Sətir-sətir:**
1. `BrowserRouter` — react-router-dom-un əsas "sarğı" komponentidir, brauzerin ünvan çubuğunu izləyib React-a bildirir.
2. `QueryClientProvider` — TanStack Query-ni bütün tətbiqə "tanıtmaq" üçün. Bunun `client` prop-una `queryClient` (aşağıda izah olunan konfiqurasiya obyekti) verilir. Bu olmadan heç bir səhifədə `useQuery`/`useMutation` işləməz.
3. `Toaster` — sonner kitabxanasının bildiriş qutucuqlarını EKRANA ÇIXARAN komponent. `position="top-right"` — sağ yuxarı küncdə çıxsın. `richColors` — uğur/xəta üçün rəngli (yaşıl/qırmızı) fon versin.
4. **Diqqət**: `<AppRoutes/>` və `<Toaster/>` `<BrowserRouter>`-in İÇİNDƏDİR, amma bir-birinin QARDAŞIdır (biri digərinin içində deyil) — ikisi də eyni səviyyədə, yan-yana render olunur.

Bu faylda (VƏ ÇOX SAYDA BAŞQA FAYLDA) HEÇ BİR `: TipAdı` GÖRMÜRSÜNÜZSƏ, TƏƏCCÜBLƏNMƏYİN — `App` KOMPONENTİNİN PARAMETRİ (PROP-U) YOXDUR, TypeScript BURADA ƏLAVƏ TİP YAZILMASINA EHTİYAC DUYMUR, ÇÜNKİ HƏR ŞEY (QAYTARILAN JSX DAXİL) AVTOMATİK OLARAQ DOĞRU TİPDƏ "İNFER" OLUNUR (Hissə 3-DƏKİ "TİP İNFERENCE"-Ə BAXIN). **TypeScript, HƏR YERDƏ AÇIQ-AŞKAR TİP YAZMAĞI TƏLƏB ETMİR — YALNIZ TİPİ ÖZÜ "TAPA BİLMƏDİYİ" YERLƏRDƏ (MƏS. FUNKSİYA PARAMETRLƏRİ) YAZILIR.**

---

## Hissə 7: Routing

### `src/routes/AppRoutes.tsx`

```tsx
import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import RequireAuth from '@/routes/RequireAuth'
import RedirectIfAuth from '@/routes/RedirectIfAuth'
import AdminLayout from '@/layouts/AdminLayout'
import Loading from '@/shared/components/Loading/Loading'

const Login = lazy(() => import('@/pages/Login/Login'))
const NotFound = lazy(() => import('@/pages/NotFound/NotFound'))
const Orders = lazy(() => import('@/pages/protected/Orders/Orders'))
const Campaigns = lazy(() => import('@/pages/protected/Campaigns/Campaigns'))
const Categories = lazy(() => import('@/pages/protected/Categories/Categories'))
const Products = lazy(() => import('@/pages/protected/Products/Products'))
const Users = lazy(() => import('@/pages/protected/Users/Users'))

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loading fullScreen />}>
      <Routes>
        <Route
          path="/login"
          element={
            <RedirectIfAuth>
              <Login />
            </RedirectIfAuth>
          }
        />
        <Route element={<RequireAuth />}>
          <Route element={<AdminLayout />}>
            <Route path="/sifarisler" element={<Orders />} />
            <Route path="/kampaniyalar" element={<Campaigns />} />
            <Route path="/kateqoriyalar" element={<Categories />} />
            <Route path="/mehsullar" element={<Products />} />
            <Route path="/istifadeciler" element={<Users />} />
          </Route>
        </Route>
        <Route path="/" element={<Navigate to="/sifarisler" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}
```

**Nə üçün `lazy(() => import(...))`?** Normal `import Login from '...'` DƏRHAL, tətbiq açılan kimi o faylın kodunu yükləyir — hətta istifadəçi `/login`-ə heç getməsə belə. `lazy()` isə "bu komponentin kodunu YALNIZ LAZIM OLANDA (həmin route-a keçiləndə) yüklə" deyir. Nəticədə hər səhifə öz kiçik JS faylı (chunk) kimi ayrılır, ilk yükləmə daha sürətli olur. Bu sətirdə TypeScript-ə aid HEÇ NƏ YOXDUR (bu, TAM React-in ÖZ mexanizmidir) — AMMA maraqlıdır Kİ, `lazy(() => import('@/pages/Login/Login'))` YAZANDA, TypeScript ARTIQ BİLİR Kİ, `Login` KOMPONENTİ NECƏ İSTİFADƏ OLUNMALIDIR (PROP-LARI VƏ S.) — ÇÜNKİ O FAYLIN ÖZÜNDƏKİ TİPLƏRİ "İZLƏYİR", HƏTTA KOD HƏLƏ YÜKLƏNMƏSƏ BELƏ.

**`Suspense` nədir?** `lazy()` ilə yüklənən komponentin kodu HƏLƏ GƏLMƏYİBSƏ (yüklənməsi bir neçə millisaniyə çəkə bilər), React nə göstərəcəyini bilmir — buna görə `<Suspense fallback={...}>` "bu komponent hazır olana qədər `fallback`-ı göstər" deyir. Burda `fallback={<Loading fullScreen/>}` — bütün ekranı ortalanmış spinner tutur.

**Sətir-sətir marşrut ağacı:**
- `<Route path="/login" element={<RedirectIfAuth><Login/></RedirectIfAuth>} />` — `/login` ünvanına gedəndə, əvvəlcə `RedirectIfAuth` yoxlayır (aşağıda izah), sonra `Login`-i göstərir.
- `<Route element={<RequireAuth/>}>` — bu, "layout route"-dur, öz `path`-ı yoxdur, sadəcə İÇİNDƏKİ bütün route-ları `RequireAuth` yoxlamasından keçirir (login olmayıbsa, heç birinə keçid vermir).
- Onun İÇİNDƏ daha bir `<Route element={<AdminLayout/>}>` var — bu da eyni məntiqlə, İÇİNDƏKİ 5 səhifəni `AdminLayout`-un (sidebar+header) İÇİNƏ "yerləşdirir" (aşağıda `<Outlet/>` ilə izah olunur).
- `<Route path="/" element={<Navigate to="/sifarisler" replace/>} />` — kimsə sadəcə sayt adının kök ünvanına (`/`) girsə, avtomatik `/sifarisler`-ə YÖNLƏNDİRİLİR. `replace` — brauzerin "geri" düyməsi bu addımı ATLAYIR (tarixçəyə əlavə olunmur).
- `<Route path="*" element={<NotFound/>} />` — `*` "başqa HEÇ NƏYƏ uymayan İSTƏNİLƏN yol" deməkdir — yəni tanış olmayan bir URL yazılsa, 404 səhifəsi göstərilir.

### `src/routes/RequireAuth.tsx`

```tsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'

export default function RequireAuth() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}
```

**Sətir-sətir:**
1. `useAuthStore((s) => s.isAuthenticated)` — zustand store-dan YALNIZ `isAuthenticated` sahəsini "seçib" alır (aşağıda zustand-ı ətraflı izah edəcəyik). `(s) => s.isAuthenticated` bir "selector" funksiyasıdır — "store-un tam vəziyyətindən (`s`) mənə YALNIZ bu sahəni ver" deməkdir. **TİP baxımından:** `s` PARAMETRİNİN NÖVÜ (`AuthState`, Hissə 8-DƏ GÖRƏCƏYİK) TypeScript TƏRƏFİNDƏN AVTOMATİK "İNFER" OLUNUR (Hissə 3-Ə BAXIN) — ÇÜNKİ `useAuthStore`-UN ÖZÜ `create<AuthState>()` İLƏ YARADILIB, ONA GÖRƏ TypeScript ARTIQ BİLİR Kİ, `s.isAuthenticated` MÖVCUDDUR VƏ `boolean`-DIR.
2. `isAuthenticated ? <Outlet/> : <Navigate to="/login" replace/>` — ternar operator ilə: login olubsa `<Outlet/>` göstər, olmayıbsa `/login`-ə göndər.
3. **`<Outlet/>` nədir?** react-router-dom-un xüsusi komponentidir — "burada, bu layout route-un İÇİNDƏKİ konkret route (uşaq route) render olunmalıdır" yer tutucusudur. `AppRoutes.tsx`-də `<Route element={<RequireAuth/>}>`-nin İÇİNDƏKİ hər route (`/sifarisler`, `/kampaniyalar` və s.) məhz bu `<Outlet/>`-in yerinə "yerləşdirilir".

### `src/routes/RedirectIfAuth.tsx`

```tsx
import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'

interface RedirectIfAuthProps {
  children: ReactNode
}

export default function RedirectIfAuth({ children }: RedirectIfAuthProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  return isAuthenticated ? <Navigate to="/sifarisler" replace /> : children
}
```

`RequireAuth`-ın TƏRSİDİR: artıq login OLMUŞ bir istifadəçi `/login`-ə girməyə cəhd etsə, ona login formasını göstərmək əvəzinə birbaşa `/sifarisler`-ə yönləndirir. `interface RedirectIfAuthProps { children: ReactNode }` — Hissə 3-DƏ İZAH OLUNAN `interface` İLƏ, BU KOMPONENTİN QƏBUL ETDİYİ PROP-UN FORMASINI TƏYİN EDİR: `children` — HƏR HANSI RENDER OLUNA BİLƏN ŞEY (BİR KOMPONENT, MƏTN, MASSİV VƏ S. — `ReactNode`, React-IN ÖZ TİPİDİR, "İSTƏNİLƏN RENDER OLUNA BİLƏN ŞEY" DEMƏKDİR). `<RedirectIfAuth><Login/></RedirectIfAuth>` yazanda, `<Login/>` elementi `children` kimi ötürülür, biz onu login olmayanda sadəcə geri qaytarırıq (`: children`).

---

## Hissə 8: Auth

### `src/lib/auth/session.ts`

Bu fayl, giriş məlumatlarını (token-lər, profil) brauzerin **`localStorage`**-ında saxlayır. `localStorage` — brauzerin diskində saxlanan, səhifə bağlanıb-açılsa belə İTMƏYƏN açar-dəyər (key-value) yaddaşıdır.

```ts
import type { AuthTokens, LoginResponse, Profile } from '@/types/auth'

const ACCESS_KEY = 'tiktak_admin_access_token'
const REFRESH_KEY = 'tiktak_admin_refresh_token'
const PROFILE_KEY = 'tiktak_admin_profile'

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_KEY)
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_KEY)
}

export function getStoredProfile(): Profile | null {
  const raw = localStorage.getItem(PROFILE_KEY)
  return raw ? (JSON.parse(raw) as Profile) : null
}

export function saveSession({ tokens, profile }: LoginResponse): void {
  localStorage.setItem(ACCESS_KEY, tokens.access_token)
  localStorage.setItem(REFRESH_KEY, tokens.refresh_token)
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
}

export function saveTokens(tokens: AuthTokens): void {
  localStorage.setItem(ACCESS_KEY, tokens.access_token)
  localStorage.setItem(REFRESH_KEY, tokens.refresh_token)
}

export function clearSession(): void {
  localStorage.removeItem(ACCESS_KEY)
  localStorage.removeItem(REFRESH_KEY)
  localStorage.removeItem(PROFILE_KEY)
}
```

**Sətir-sətir (VƏ HƏR YERDƏ ƏLAVƏ OLUNAN TİPLƏR):**
1. `import type { AuthTokens, LoginResponse, Profile } from '@/types/auth'` — Hissə 5-DƏ TƏYİN OLUNAN ÜÇ TİPİ GƏTİRİR. `import type` (`import` YOX) YAZILIB, ÇÜNKİ BUNLAR YALNIZ TİPDİR, RUNTIME-DA HEÇ BİR "DƏYƏR" DEYİL (Hissə 3-Ə BAXIN).
2-4. Üç sabit — `localStorage`-da istifadə ediləcək "açar adları". TypeScript BUNLARIN `string` OLDUĞUNU ÖZÜ "İNFER" EDİR, ƏLAVƏ YAZILMASINA EHTİYAC YOXDUR.
6-8. `getAccessToken(): string | null` — FUNKSİYA ADINDAN SONRAKI `: string | null` — **QAYTARILAN DƏYƏRİN TİPİDİR** (Hissə 3-DƏKİ UNION-A BAXIN): "BU FUNKSİYA YA STRİNG, YA DA `null` QAYTARIR" (`localStorage.getItem(...)`-in ÖZÜNÜN TİPİ MƏHZ BUDUR — TAPILMASA `null`).
10-12. `getRefreshToken()` — eynilə, refresh token üçün.
14-17. `getStoredProfile(): Profile | null` — `localStorage` HƏMİŞƏ **string** saxlayır, obyekt yox. Ona görə profil `JSON.stringify()` ilə YAZILIB, oxuyanda `JSON.parse()` ilə GERİ obyektə çevrilir. `JSON.parse(raw) as Profile` — Hissə 3-DƏ İZAH OLUNAN `as` ASSERSİYASI: `JSON.parse` ÖZÜ "İSTƏNİLƏN ŞEY" (`any`, TypeScript-in DAXİLİ QAYDASINA GÖRƏ) QAYTARIR, BİZ `as Profile` İLƏ "BUNA ETİBAR ET, `Profile` FORMASINDADIR" DEYİRİK (ÇÜNKİ YALNIZ `saveSession` FUNKSİYASI BU AÇARA YAZIR, VƏ O DA MƏHZ `Profile` FORMASINDA YAZIR).
19-23. `saveSession({ tokens, profile }: LoginResponse): void` — PARAMETR DESTRUCTURE OLUNUB (Hissə 2), TİPİ İSƏ `LoginResponse` (`{tokens: AuthTokens, profile: Profile}` FORMASINDA, Hissə 5-Ə BAXIN). `: void` — "BU FUNKSİYA HEÇ NƏ QAYTARMIR" (Hissə 3-DƏKİ `void`-Ə BAXIN). Login uğurlu olanda ÇAĞIRILIR, hər üç dəyəri `localStorage`-a yazır.
25-28. `saveTokens(tokens: AuthTokens): void` — YALNIZ token-ləri yeniləmək üçün (profil dəyişmir) — token "refresh" olunanda istifadə olunur (aşağıda `axiosInstance.ts`-də).
30-34. `clearSession(): void` — logout-da bütün üç açarı `localStorage`-dan SİLİR.

### `src/store/useAuthStore.ts`

Bu, **zustand** ilə qurulmuş "qlobal state"dir. Zustand-ı belə düşünün: `useState` yalnız BİR komponentin daxilində yaşayır, komponent yox olanda dəyər də itir. Zustand store isə tətbiqin İSTƏNİLƏN yerindən əlçatandır və HƏMİŞƏ yaddadır (səhifə naviqasiyası zamanı sıfırlanmır).

```ts
import { create } from 'zustand'
import { loginAdmin } from '@/services/authService'
import { getAccessToken, getStoredProfile, saveSession, clearSession } from '@/lib/auth/session'
import type { Profile } from '@/types/auth'

interface AuthState {
  profile: Profile | null
  isAuthenticated: boolean
  login: (phone: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  profile: getStoredProfile(),
  isAuthenticated: !!getAccessToken(),

  login: async (phone, password) => {
    const data = await loginAdmin({ phone, password })
    saveSession(data)
    set({ profile: data.profile, isAuthenticated: true })
  },

  logout: () => {
    clearSession()
    set({ profile: null, isAuthenticated: false })
  },
}))

window.addEventListener('storage', () => {
  useAuthStore.setState({
    isAuthenticated: !!getAccessToken(),
    profile: getStoredProfile(),
  })
})
```

**Sətir-sətir:**
1. `create` — zustand-ın store yaradan funksiyası.
6-11. **`interface AuthState { ... }`** — BU, YENİ ƏLAVƏ OLUNAN HİSSƏDİR (JS VERSİYASINDA YOX İDİ): STORE-UN DƏQİQ HANSI SAHƏLƏRƏ VƏ FUNKSİYALARA MALİK OLDUĞUNU TƏSVİR EDİR.
   - `profile: Profile | null` — YA `Profile` FORMASINDA OBYEKT, YA DA (LOGIN OLUNMAYIBSA) `null`.
   - `isAuthenticated: boolean` — true/false.
   - `login: (phone: string, password: string) => Promise<void>` — Hissə 3-DƏKİ "FUNKSİYA TİPİ": "BU, İKİ STRİNG PARAMETRİ ALAN, VƏ `Promise<void>` QAYTARAN BİR FUNKSİYADIR" DEMƏKDİR. `Promise<void>` — "BU FUNKSİYA `async`-DIR (Hissə 2-Ə BAXIN), NƏTİCƏSİNİ GÖZLƏMƏK OLAR (`await`), AMMA HEÇ BİR DƏYƏR QAYTARMIR" (`void`, YUXARIDA İZAH OLUNDU) DEMƏKDİR.
   - `logout: () => void` — PARAMETRSİZ, HEÇ NƏ QAYTARMAYAN FUNKSİYA.
13. `create<AuthState>((set) => ({ ... }))` — **`<AuthState>`** BURADA, Hissə 3-DƏ İZAH OLUNAN GENERİK SİNTAKSİSDİR: `create` FUNKSİYASINA "BU STORE-UN FORMASI DƏQİQ `AuthState`-DİR" DEYİRİK. Bunun NƏTİCƏSİ: `set({...})` ÇAĞIRANDA, YA DA `useAuthStore((s) => s.isAuthenticated)` YAZANDA, TypeScript DƏQIQ BİLİR Kİ, HANSI SAHƏLƏR VAR, HANSI YOXDUR — SƏHVƏN OLMAYAN BİR SAHƏ (`useAuthStore((s) => s.profil)` — "profil" SƏHV YAZILIB, DOĞRUSU "profile") YAZSANIZ, TypeScript DƏRHAL TUTAR.
14. `profile: getStoredProfile()` — store YARADILAN ANDA (səhifə ilk açılanda) `localStorage`-dan profili oxuyub başlanğıc dəyər kimi qoyur. Beləliklə, səhifəni yeniləsəniz (F5) belə, login "yadda qalır".
15. `isAuthenticated: !!getAccessToken()` — `!!` iki dəfə "yox" (NOT) işarəsidir, İSTƏNİLƏN dəyəri `true`/`false`-a çevirmək üçün trik: `getAccessToken()` bir string ("...") ya da `null` qaytarır; `!null` → `true`, `!"..."` → `false`, sonra bir daha `!` vuraraq: `!!null` → `false`, `!!"..."` → `true`. Yəni "token varsa `true`, yoxdursa `false`".
17-21. `login` — `async` funksiyadır (içində `await` var). `loginAdmin` (servis funksiyası, aşağıda) çağırılır, cavab gözlənilir, `saveSession` ilə `localStorage`-a yazılır, sonra `set({...})` ilə store-un CARİ vəziyyəti YENİLƏNİR — bu, bütün `useAuthStore`-a abunə olmuş komponentləri (`RequireAuth`, `Sidebar` və s.) AVTOMATİK yenidən render etdirir. **DİQQƏT:** `login: async (phone, password) => {...}` YAZILIB, PARAMETRLƏRƏ AYRICA `: string` YAZILMAYIB — ÇÜNKİ TypeScript ARTIQ YUXARIDAKI `interface AuthState`-DƏN "BİLİR" Kİ, `login`-İN İKİ STRİNG PARAMETRİ VAR (BU, "KONTEKSTUAL TİP" ADLANIR — TypeScript, BİR YERDƏ TİP TƏYİN EDİLİBSƏ, ONU TƏKRAR-TƏKRAR YAZDIRMIR).
23-26. `logout` — `clearSession()` ilə `localStorage` təmizlənir, `set({...})` ilə store-da `profile: null, isAuthenticated: false` qoyulur.
29-34. **Tab-lar arası sinxronizasiya** — `window.addEventListener('storage', ...)` brauzerin xüsusi bir hadisəsinə (event) qulaq asır. `storage` event-i YALNIZ o zaman atılır ki, `localStorage` BAŞQA BİR TAB-DA dəyişsin (öz tab-ınızda dəyişəndə SİZDƏ atılmır, digər açıq tab-larda atılır). Yəni: bir tab-da "Çıxış" etsəniz, digər açıq tab bunu bu listener vasitəsilə eşidir və öz `isAuthenticated`-ini də `false`-a çevirir → o tab-dakı `RequireAuth` da dərhal `/login`-ə yönləndirir.

### `src/services/authService.ts`

```ts
import api from './axiosInstance'
import type { LoginPayload, LoginResponse, Profile } from '@/types/auth'

export const loginAdmin = (payload: LoginPayload) =>
  api.post<LoginResponse>('/auth/admin/login', payload, { skipAuthRetry: true })
export const getProfile = () => api.get<Profile>('/admin/profile')
```

**Sətir-sətir:**
1. `api` — `axiosInstance.ts`-dən gətirilən, artıq konfiqurasiya edilmiş axios "instansı" (obyekti). Adi `axios` yox, MƏHZ BU layihənin özəl ayarları (base URL, header-lər, xəta idarəsi) ilə olanı.
4-5. `loginAdmin` — `api.post<LoginResponse>(yol, data, əlavə_ayarlar)`. **`<LoginResponse>`** — Hissə 3-DƏKİ GENERİK SİNTAKSİS: "BU SORĞUNUN CAVABI `LoginResponse` FORMASINDA (`{tokens, profile}`) OLACAQ" DEMƏKDİR — BUNU YAZDIQDAN SONRA, `loginAdmin(...)`-İN NƏTİCƏSİNİ İSTİFADƏ EDƏN HƏR YERDƏ (MƏS. YUXARIDAKI `useAuthStore`-DA `data.profile`), TypeScript ARTIQ DƏQİQ BİLİR `data`-NIN HANSI SAHƏLƏRƏ MALİK OLDUĞUNU. `{ skipAuthRetry: true }` — bu, axios-un ÖZÜNÜN taniyacağı bir seçim deyil, BİZİM ÖZ konfiqurasiyamızda (`axiosInstance.ts`-də) yoxlanan xüsusi bir bayraqdır (Hissə 3-DƏKİ `declare module` BÖLMƏSİNƏ BAXIN — MƏHZ BU SAHƏNİN TypeScript-Ə "TANIDILMASI" ORADA BAŞ VERİR): "bu sorğu 401 alsa, token-i yeniləməyə CƏHD ETMƏ" (çünki bu, MƏHZ LOGİN sorğusudur — səhv parol daxil edəndə 401 gəlir, bu, "sessiya bitib" demək deyil).
6. `getProfile` — sadə GET sorğusu, `<Profile>` GENERİK İLƏ, hazırda heç bir səhifədə İSTİFADƏ OLUNMUR, gələcək üçün hazırdır.

---

## Hissə 9: API qatı

### `src/types/api.ts` — ƏVVƏLCƏ TİPLƏRƏ BAXAQ

`axiosInstance.ts`-i OXUMAZDAN ƏVVƏL, ONUN İSTİFADƏ ETDİYİ TİPLƏRİN TƏYİN OLUNDUĞU FAYLA BAXAQ — Hissə 3-DƏ İZAH OLUNAN `declare module` VƏ `UnwrappedApi` MƏHZ BURADADIR:

```ts
import 'axios'
import type { AxiosRequestConfig } from 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuthRetry?: boolean
    _retry?: boolean
  }
}

export interface ApiEnvelope<T> {
  message: string
  data: T
  result: boolean
}

export interface UnwrappedApi {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>
  post<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T>
  put<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T>
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>
}
```

- `import 'axios'` + `declare module 'axios' { ... }` — Hissə 3-DƏ İZAH OLUNDU: `axios` PAKETİNİN ÖZÜNÜN `AxiosRequestConfig` TİPİNƏ, KƏNARDAN, `skipAuthRetry`/`_retry` SAHƏLƏRİNİ "ƏLAVƏ EDİRİK".
- `ApiEnvelope<T>` — BACKEND-İN STANDART CAVAB "ZƏRFİNİN" (`{message, data, result}`) TİPİDİR, **GENERİK**DİR (`<T>`) ÇÜNKİ `data` SAHƏSİNİN FORMASI HƏR ENDPOINT ÜÇÜN FƏRQLİDİR (BƏZƏN `Category`, BƏZƏN `Category[]`, VƏ S.) — BU FAYLDA TƏYİN OLUNSA DA, PRAKTİKADA BİRBAŞA İSTİFADƏ OLUNMUR (ÇÜNKİ `handleSuccess` ARTIQ ZƏRFİ AÇIR, AŞAĞIYA BAXIN), SADƏCƏ SƏNƏDLƏŞDİRMƏ MƏQSƏDİ DAŞIYIR.
- `UnwrappedApi` — Hissə 3-DƏ İZAH OLUNAN, EN VACİB TİPDİR: "ZƏRFİ AÇILMIŞ" (UNWRAPPED) BİR AXIOS-UN NECƏ GÖRÜNMƏLİ OLDUĞUNU TƏSVİR EDİR. `get<T>(url, config?): Promise<T>` — "BU FUNKSİYA, BİR `url` (VƏ OPSİONAL `config`) ALIR, VƏ `T` TİPİNDƏ BİR DƏYƏRİ `Promise` İLƏ QAYTARIR" DEMƏKDİR — DİQQƏT EDİN, `Promise<AxiosResponse<T>>` YOX, BİRBAŞA `Promise<T>` — ÇÜNKİ REAL AXIOS `AxiosResponse` (BÜTÜN HTTP CAVAB MƏLUMATLARI — STATUS KODU, HEADER-LƏR VƏ S.) QAYTARDIĞI HALDA, BİZİM `api`-MİZ (AŞAĞIDA GÖRƏCƏYİK) ARTIQ BUNU "AÇIB", BİRBAŞA FAYDALI DATANI QAYTARIR.

### `src/services/axiosInstance.ts` — ən mürəkkəb fayl, diqqətlə oxuyun

Bu fayl, layihədəki BÜTÜN backend sorğularının keçdiyi "mərkəzi məntəqədir". Hər `api.get(...)`/`api.post(...)` çağırışı, əslində bu fayldakı qaydalardan keçir.

```ts
import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { getAccessToken, getRefreshToken, saveTokens, clearSession } from '@/lib/auth/session'
import { useAuthStore } from '@/store/useAuthStore'
import type { AuthTokens } from '@/types/auth'
import type { UnwrappedApi } from '@/types/api'

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/tiktak`

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Accept-Language': 'az' },
})
```

**Sətir-sətir:**
1. `import axios, { type AxiosError, ... } from 'axios'` — DİQQƏT EDİN, BİR SƏTİRDƏ HƏM ADİ İDXAL (`axios`, RUNTIME-da lazımdır), HƏM DƏ `type` İLƏ İŞARƏLƏNMİŞ TİP İDXALLARI (`AxiosError`, `AxiosResponse`, `InternalAxiosRequestConfig` — YALNIZ TypeScript ÜÇÜN) VAR — Hissə 3-DƏKİ `import type`-A BAXIN, BU, ONUN "QARIŞIQ" (BİR HİSSƏSİ TİP, BİR HİSSƏSİ DƏYƏR) FORMASIDIR.
5. `import.meta.env.VITE_API_BASE_URL` — Vite-in xüsusi sintaksisidir, `.env` faylındakı `VITE_API_BASE_URL=https://...` dəyərini oxuyur. TypeScript-in `VITE_API_BASE_URL`-in `string` OLDUĞUNU NECƏ "BİLDİYİ" Hissə 20-DƏ (`vite-env.d.ts`) İZAH OLUNUR. `${...}` template literal-dır (yuxarıda izah olundu) — iki string-i BİRLƏŞDİRİR: `.env`-dəki ünvan + sabit `/api/tiktak` sonluğu.
7-10. `axios.create({...})` — YENİ, ÖZƏLLƏŞDİRİLMİŞ bir axios "instansı" yaradır (adi `axios`-dan fərqli olaraq). `baseURL` — bundan sonra `api.get('/admin/categories')` yazsanız, əslində TAM ünvana (`BASE_URL + '/admin/categories'`) sorğu gedir. `headers: {'Accept-Language': 'az'}` — HƏR sorğuya avtomatik bu header əlavə olunur (backend-ə "cavabı Azərbaycan dilində ver" demək üçün). **BU NÖQTƏDƏ, `api` DƏYİŞƏNİ HƏLƏ "HƏQİQİ" AXIOS TİPİNDƏDİR** (`UnwrappedApi` YOX) — FAYLIN SONUNDA GÖRƏCƏYİMİZ KİMİ, TİPİ YALNIZ EXPORT EDƏNDƏ DƏYİŞDİRİRİK.

```ts
api.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
```

**"Interceptor" nədir?** — Hərfi tərcüməsi "ələ keçirən"dir. Axios-a "HƏR sorğu göndərilməzdən ƏVVƏL (request interceptor) BU funksiyanı işə sal" deyir. Burada: hər sorğudan əvvəl `localStorage`-dan token oxunur, VARSA, sorğunun header-lərinə `Authorization: Bearer <token>` əlavə olunur. `config` — sorğunun bütün ayarlarını (url, method, header-lər) daşıyan obyektdir, funksiyanın SONUNDA MÜTLƏQ geri qaytarılmalıdır (`return config`), yoxsa sorğu GETMƏZ. Bu funksiyanın PARAMETRİNƏ (`config`) AYRICA TİP YAZILMAYIB, ÇÜNKİ `api.interceptors.request.use(...)`-UN ÖZÜ ARTIQ "BU FUNKSİYA BELƏ BİR PARAMETR ALACAQ" DEYƏ TİPİ BİLDİRİR (Hissə 3-DƏKİ "KONTEKSTUAL TİP"-Ə BAXIN, `useAuthStore`-DAKI `login` MİSALI İLƏ EYNİ MƏNTİQ).

```ts
// Declared to return AxiosResponse only to satisfy axios's interceptor typing —
// at runtime this unwraps the `{data}` envelope to the raw payload. The real
// public contract callers see is `UnwrappedApi` (the `as unknown as UnwrappedApi`
// cast on the default export below), not this function's nominal return type.
const handleSuccess = (response: AxiosResponse) => (response.data.data ?? response.data) as AxiosResponse
```

Backend HƏR cavabı `{ message: "Ok", data: {...}, result: true }` formasında qaytarır (bu, layihənin backend-inin öz qaydasıdır — `docs/API.md`-də sənədləşdirilib). Bizə isə YALNIZ `data` hissəsi lazımdır, `message`/`result` yox. `response.data.data` — bu, "cavabın body-sinin İÇİNDƏKİ `data` sahəsi" deməkdir (`response.data` = bütün body, `response.data.data` = onun `data` sahəsi). `?? response.data` — əgər `data` sahəsi YOXDURSA (bəzi endpoint-lər — məs. statistika — bu qaydaya uymur, birbaşa xam obyekt qaytarır), onda BÜTÜN body-ni qaytar.

**`as AxiosResponse` NİYƏ VAR, HALBUKI QAYTARILAN DƏYƏR HƏQİQƏTƏN `AxiosResponse` DEYİL?** Bu, Hissə 3-DƏ QEYD OLUNAN, LAYİHƏDƏKİ ƏN "FƏRQLİ" TİP YAZISIDIR: `api.interceptors.response.use(...)` FUNKSİYASI (BİRAZ AŞAĞIDA GÖRƏCƏYİK) AXIOS-UN ÖZ TİP TƏLƏBİNƏ GÖRƏ, BU FUNKSİYANIN `AxiosResponse` QAYTARMASINI GÖZLƏYİR (ÇÜNKİ, TİP SƏVİYYƏSİNDƏ, `api` HƏLƏ "ADİ" AXIOS İNSTANSIDIR, `UnwrappedApi` YOX). AMMA RUNTIME-DA (KODUN HƏQİQİ İŞLƏMƏ ANINDA), BU FUNKSİYA ARTIQ ZƏRFİ AÇIB, TAM FƏRQLİ BİR FORMA (`XApi` KİMİ BİR OBYEKT, YA DA MASSİV) QAYTARIR. YƏNİ: **BU FUNKSİYANIN "ELAN OLUNAN" TİPİ İLƏ "HƏQİQİ" DAVRANIŞI QƏSDƏN FƏRQLİDİR** — BU UYĞUNSUZLUĞUN "DÜZGÜN" TƏRƏFİ, FAYLIN SONUNDAKI `export default api as unknown as UnwrappedApi` SƏTRİDİR (AŞAĞIDA GÖRƏCƏYİK) — ORADAN SONRA, LAYİHƏNİN QALAN HİSSƏSİ ARTIQ `api`-Nİ `UnwrappedApi` KİMİ GÖRÜR, BU ARADAKI "KİÇİK YALANI" GÖRMÜR.

```ts
const STATUS_MESSAGES: Record<number, string> = {
  400: 'Məlumatlar düzgün deyil',
  403: 'Bu əməliyyat üçün icazəniz yoxdur',
  404: 'Tapılmadı',
  409: 'Bu məlumat artıq mövcuddur',
  422: 'Məlumatlar düzgün deyil',
  500: 'Server xətası baş verdi',
}

function getErrorMessage(error: AxiosError, isLogin?: boolean): string {
  if (!error.response) return 'Serverə qoşulmaq mümkün olmadı'
  if (error.response.status === 401) {
    return isLogin ? 'Telefon və ya parol yanlışdır' : 'Sessiya bitib, yenidən daxil olun'
  }
  const isProductDelete = error.config?.method === 'delete' && /\/admin\/products\//.test(error.config?.url ?? '')
  if (isProductDelete && [400, 422].includes(error.response.status)) {
    return 'Bu məhsul mövcud sifarişlərdə istifadə olunduğu üçün silinə bilməz'
  }
  return STATUS_MESSAGES[error.response.status] || 'Xəta baş verdi'
}
```

`STATUS_MESSAGES: Record<number, string>` — Hissə 3-DƏKİ `Record<Açar, Dəyər>`-Ə BAXIN: "AÇARLARI RƏQƏM (HTTP STATUS KODLARI), DƏYƏRLƏRİ STRİNG (AZƏRBAYCANCA MESAJ) OLAN BİR OBYEKT" DEMƏKDİR. Backend-in ÖZÜ ingiliscə mesaj qaytarır (`"Password is wrong!"` kimi) — biz bunu İSTİFADƏÇİYƏ GÖSTƏRMİRİK, ƏVƏZİNƏ status koduna görə ÖZ Azərbaycanca mesajımızı seçirik ki, bütün bildirişlər eyni dildə olsun.

`getErrorMessage(error: AxiosError, isLogin?: boolean): string`:
- `error: AxiosError` — PARAMETRİN TİPİ AXIOS-UN ÖZ XƏTA TİPİDİR (BÜTÜN XƏTA SORĞULARININ ORTAQ FORMASI — `response`, `config` KİMİ SAHƏLƏRİ VAR).
- `isLogin?: boolean` — Hissə 3-DƏKİ `?` İLƏ, "BU PARAMETR OPSİONALDIR" (verilməyə bilər, verilməzsə `undefined` OLUR).
- `: string` — FUNKSİYANIN QAYTARDIĞI DƏYƏRİN TİPİ (HƏMİŞƏ BİR MƏTN).
- `if (!error.response) return '...'` — `error.response` YOXDURSA (server heç cavab verməyib — internet kəsilib, server düşüb), "serverə qoşulmaq mümkün olmadı" qaytarır.
- `if (error.response.status === 401)` — 401 = "icazən yoxdur" (token səhvdir/vaxtı keçib, ya da login-də parol səhvdir). `isLogin ? '...' : '...'` — ƏGƏR bu, login sorğusudursa (parametr olaraq ötürülür) "parol yanlışdır" göstərir, YOX ƏGƏR başqa bir sorğudursa "sessiya bitib" göstərir — çünki İKİ FƏRQLİ hadisədir.
- `const isProductDelete = error.config?.method === 'delete' && /\/admin\/products\//.test(error.config?.url ?? '')` — BU SƏTİR, MƏHSUL SİLİNMƏSİ ZAMANI BAŞ VERƏN XÜSUSİ BİR XƏTA HALINI YOXLAYIR (SİFARİŞDƏ İSTİFADƏ OLUNAN MƏHSUL SİLİNƏ BİLMƏZ). `error.config?.url ?? ''` — `?.` (OPTIONAL CHAINING) + `?? ''` (NULLISH COALESCING) BİRLİKDƏ İŞLƏNİB (Hissə 2-Ə BAXIN): `error.config` YOXDURSA XƏTA VERMİR, `url` DƏ YOXDURSA BOŞ STRİNG İSTİFADƏ OLUNUR.
- Son sətir: `STATUS_MESSAGES[error.response.status]` — obyektdən status koduna GÖRƏ mesajı ÇIXARIR (`[...]` ilə DİNAMİK açar oxumaq). `|| 'Xəta baş verdi'` — obyektdə HƏMİN kod ÜÇÜN mesaj yoxdursa (məs. 502), ÜMUMİ bir mesaj qaytarır.

```ts
let refreshPromise: Promise<AuthTokens> | null = null

function refreshAccessToken(): Promise<AuthTokens> {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(`${BASE_URL}/auth/refresh`, { refresh_token: getRefreshToken() }, { headers: { 'Accept-Language': 'az' } })
      .then((res) => {
        const tokens = res.data.data as AuthTokens
        saveTokens(tokens)
        return tokens
      })
      .finally(() => {
        refreshPromise = null
      })
  }
  return refreshPromise
}
```

Bu funksiya, access token-in VAXTI keçəndə YENİSİNİ almaq üçündür (backend-in `/auth/refresh` endpoint-i vasitəsilə).

- `let refreshPromise: Promise<AuthTokens> | null = null` — `const` YOX, `let` (çünki bu dəyər DƏYİŞƏCƏK). **TİP:** `Promise<AuthTokens> | null` — Hissə 3-DƏKİ UNION: "YA HƏLƏ DAVAM EDƏN BİR REFRESH SORĞUSUNUN `Promise`-İ, YA DA (HEÇ BİR SORĞU GETMİRSƏ) `null`". Başlanğıcda heç bir "davam edən refresh sorğusu" yoxdur, ona görə `null`.
- `if (!refreshPromise)` — ƏGƏR HAZIRDA davam edən bir refresh sorğusu YOXDURSA, YENİ bir sorğu BAŞLAT. **Niyə bu yoxlama var?** Təsəvvür edin ki, EYNİ ANDA 3 fərqli sorğu 401 alıb — hər üçü token-i yeniləməyə çalışsa, backend-ə 3 DƏFƏ refresh sorğusu gedərdi (lazımsız). Bu yoxlama ilə: birinci sorğu refresh-i BAŞLADIR VƏ `refreshPromise`-a YAZIR, digər ikisi "artıq davam edir" görüb, EYNİ `refreshPromise`-ı GÖZLƏYİR (aşağıda `return refreshPromise` buna görədir).
- `axios.post(...)` — DİQQƏT: `api.post` YOX, sadə `axios.post`! Çünki `api` instansının ÖZÜNDƏ bizim interceptor-larımız var — əgər `api.post` işlətsəydik və bu sorğu DA 401 alsaydı, YENİDƏN `handleError`-a düşüb, YENİDƏN refresh cəhd edərdi — SONSUZ DÖVRƏ yaranardı. Sadə `axios.post` bu interceptor-ları BÜTÜNLƏYKƏN keçir.
- `.then((res) => { const tokens = res.data.data as AuthTokens; saveTokens(tokens); return tokens })` — sorğu uğurlu olanda, `res.data.data`-nı (SƏRBƏST AXIOS SORĞUSU OLDUĞU ÜÇÜN, BURADA `handleSuccess` İŞƏ DÜŞMÜR, ZƏRFİ ƏL İLƏ AÇIRIQ) `as AuthTokens` İLƏ TİPLƏYİRİK, `localStorage`-a yazır VƏ onları qaytarır.
- `.finally(() => { refreshPromise = null })` — sorğu istər uğurlu, istər uğursuz bitsin, `finally` HƏR HALDA işə düşür — `refreshPromise`-ı yenidən `null`-a QAYTARIR ki, NÖVBƏTİ dəfə YENİ bir refresh cəhdi edilə bilsin.
- `return refreshPromise` — bu, EGƏR yeni sorğu başladılıbsa, ONU; YOX, ARTIQ davam edən vardısa, O DAVAM edəni qaytarır.

```ts
const handleError = async (error: AxiosError) => {
  const original = error.config as InternalAxiosRequestConfig
  const isUnauthorized = error.response?.status === 401
  const canRetry = isUnauthorized && !original.skipAuthRetry && !original._retry && getRefreshToken()

  if (canRetry) {
    original._retry = true
    try {
      await refreshAccessToken()
      return api(original)
    } catch {
      clearSession()
      useAuthStore.getState().logout()
    }
  } else if (isUnauthorized && !original.skipAuthRetry) {
    clearSession()
    useAuthStore.getState().logout()
  }

  return Promise.reject(new Error(getErrorMessage(error, original.skipAuthRetry)))
}

api.interceptors.response.use(handleSuccess, handleError)

export default api as unknown as UnwrappedApi
```

Bu, "response interceptor"-un XƏTA hissəsidir — HƏR sorğu XƏTA (400, 401, 404, 500 və s.) ilə qayıdanda BU funksiya işə düşür.

- `const original = error.config as InternalAxiosRequestConfig` — `error.config` (AXIOS-UN ÖZ TİPİNƏ GÖRƏ) NƏZƏRİ OLARAQ `undefined` DƏ OLA BİLƏR, AMMA PRAKTİKADA (XƏTA VERƏN SORĞUNUN ÖZÜ VARSA) HƏMİŞƏ MÖVCUDDUR — `as InternalAxiosRequestConfig` İLƏ BUNU "QƏTİLƏŞDİRİRİK" (Hissə 3-DƏKİ `as`-A BAXIN). `InternalAxiosRequestConfig` — AXIOS-UN DAXİLİ İSTİFADƏ ETDİYİ, `_retry` KİMİ ƏLAVƏ SAHƏLƏRİ DƏ EHTİVA EDƏN GENİŞLƏNDİRİLMİŞ TİPİDİR (BİZİM `declare module` AUGMENTASİYAMIZ MƏHZ BUNA TƏSİR EDİR, ÇÜNKİ O DA `AxiosRequestConfig`-DƏN "MİRAS ALIR"). XƏTA VƏRƏN ORİJİNAL sorğunun bütün ayarlarını (url, method, data) saxlayır — lazım olsa, EYNİ sorğunu TƏKRAR göndərmək üçün.
- `const isUnauthorized = error.response?.status === 401` — status kodu DƏQİQ 401-dirsə `true`. `?.` — `error.response` YOXDURSA (şəbəkə xətasıdırsa) xəta VERMƏDƏN `undefined` qaytarır, `undefined === 401` isə `false` olur — düzgün işləyir.
- `const canRetry = isUnauthorized && !original.skipAuthRetry && !original._retry && getRefreshToken()` — DÖRD şərtin HAMISI doğru olmalıdır ki, `canRetry` `true` olsun (`original.skipAuthRetry`/`original._retry` — MƏHZ BİZİM `declare module` İLƏ AXIOS-A "TANITDIĞIMIZ" O İKİ ƏLAVƏ SAHƏDİR, Hissə 3-Ə BAXIN):
  1. `isUnauthorized` — 401-dir,
  2. `!original.skipAuthRetry` — bu sorğu "retry etmə" işarəli DEYİL (login sorğusu belə işarələnib, yuxarıda görmüşdük),
  3. `!original._retry` — bu sorğu ARTIQ BİR DƏFƏ retry EDİLMƏYİB (aşağıda `original._retry = true` yazılır ki, İKİNCİ DƏFƏ eyni sorğu YENƏ 401 versə, SONSUZ dövrəyə düşməsin),
  4. `getRefreshToken()` — `localStorage`-da bir refresh token VAR (yoxdursa, refresh cəhd etməyin mənası yoxdur).
- `if (canRetry) { ... }` — bütün şərtlər ödənibsə:
  - `original._retry = true` — bu sorğunu "artıq cəhd edilib" kimi İŞARƏLƏYİR (BU YAZI İCAZƏLİDİR, ÇÜNKİ `declare module` AUGMENTASİYASI `_retry`-Nİ "YAZILA BİLƏN" SAHƏ KİMİ TANITDIRIB).
  - `await refreshAccessToken()` — YUXARIDA izah olunan funksiyanı çağırıb, YENİ token gələnə qədər GÖZLƏYİR.
  - `return api(original)` — token yeniləndikdən SONRA, ORİJİNAL sorğunu (indi YENİ token ilə, çünki request interceptor YENİDƏN işə düşəcək) TƏKRAR göndərir.
  - `catch { ... }` — `refreshAccessToken()` DƏ uğursuz olsa (refresh token da etibarsızdırsa), `clearSession()` + `logout()` çağırılır — istifadəçi TAM çıxış edir.
- `else if (isUnauthorized && !original.skipAuthRetry)` — ƏGƏR 401-dir AMMA retry ŞƏRTLƏRİ ödənmirsə (məs. refresh token YOXDUR) — birbaşa logout.
- **DİQQƏT**: `original.skipAuthRetry` OLAN sorğular (login) BU BLOKLARIN HEÇ BİRİNƏ DÜŞMÜR — sadəcə aşağıya, son sətrə keçir.
- `return Promise.reject(new Error(getErrorMessage(error, original.skipAuthRetry)))` — FUNKSİYANIN SONU: XƏTANI Azərbaycanca mesajla YENİDƏN "rədd edir" (reject) — bu, çağıran koda (`catch (err) { toast.error(err instanceof Error ? err.message : ...) }`) gedib çatır. **BURADAN GÖRÜNDÜYÜ KİMİ, LAYİHƏDƏ BÜTÜN XƏTALAR SON NƏTİCƏDƏ ADİ, SADƏ BİR `Error` OBYEKTİDİR** — Hissə 3-DƏKİ `unknown`/`catch` BÖLMƏSİNDƏ QEYD OLUNAN "PRAKTİKADA HƏMİŞƏ `Error`-DUR" İDDİASININ SƏBƏBİ MƏHZ BURADADIR.
- `api.interceptors.response.use(handleSuccess, handleError)` — BU SƏTİR, YUXARIDA yazılan İKİ funksiyanı FAKTİKİ OLARAQ AXİOS-A "TANIDIR": BİRİNCİ arqument (`handleSuccess`) uğurlu cavablar üçün, İKİNCİ (`handleError`) xətalar üçün işə düşür.
- **`export default api as unknown as UnwrappedApi`** — LAYİHƏNİN ƏN QABAQCIL TİP SƏTRİDİR, Hissə 3-DƏ ARTIQ İZAH OLUNDU: `api` HƏQİQƏTDƏ AXIOS-UN ÖZ TİPİNDƏDİR, AMMA BİZ BİLİRİK Kİ, `handleSuccess` İNTERCEPTORU SAYƏSİNDƏ, O, ARTIQ FƏRQLİ (ZƏRFSİZ) BİR ŞEY QAYTARIR — `as unknown as UnwrappedApi` (İKİ ADDIMLI ASSERSİYA) İLƏ, EXPORT OLUNAN `api`-Nİ, HƏQİQİ DAVRANIŞINA UYĞUN OLAN `UnwrappedApi` TİPİNƏ "ÇEVİRİRİK". BUNDAN SONRA, HƏR SERVİS FAYLINDA (`categoryService.ts` VƏ S.) `api.get<CategoryApi[]>(...)` YAZANDA, TypeScript ARTIQ "DÜZGÜN" NƏTİCƏ TİPİNİ (`Promise<CategoryApi[]>`, `Promise<AxiosResponse<CategoryApi[]>>` YOX) GÖSTƏRİR.

### Servis faylları (`src/services/*.ts`)

Bu fayllar ÇOX SADƏDİR — hər biri BİR resurs (kateqoriyalar, məhsullar və s.) üçün HTTP sorğusu FUNKSİYALARINI ixrac edir. Misal:

```ts
// categoryService.ts
import api from './axiosInstance'
import type { CategoryApi, CategoryPayload } from '@/types/category'

export const listCategories = () => api.get<CategoryApi[]>('/admin/categories')
export const createCategory = (payload: CategoryPayload) => api.post<CategoryApi>('/admin/category', payload)
export const updateCategory = (id: number, payload: CategoryPayload) =>
  api.put<CategoryApi>(`/admin/categories/${id}`, payload)
export const deleteCategory = (id: number) => api.delete<null>(`/admin/categories/${id}`)
```
- `api.get<CategoryApi[]>('/admin/categories')` — GET sorğusu, "CAVAB, `CategoryApi` OBYEKTLƏRİNDƏN İBARƏT BİR MASSİVDİR" (`CategoryApi[]`) DEYƏRƏK, siyahını GƏTİRİR.
- `api.post<CategoryApi>('/admin/category', payload)` — POST, "CAVAB, TƏK BİR `CategoryApi` OLACAQ" DEYƏRƏK, YENİ kateqoriya YARADIR (`payload: CategoryPayload` — göndəriləcək data, TİPLƏNMİŞ).
- `api.put<CategoryApi>(\`/admin/categories/${id}\`, payload)` — PUT, MÖVCUD kateqoriyanı YENİLƏYİR (`id: number` — TİPLƏNMİŞ PARAMETR, şablon literalla URL-in İÇİNƏ yerləşdirilir).
- `api.delete<null>(\`/admin/categories/${id}\`)` — DELETE, "CAVABDA HEÇ BİR FAYDALI DATA YOXDUR" (`<null>`, ÇÜNKİ SİLİNMƏ CAVABI `docs/API.md`-YƏ GÖRƏ `data: null` QAYTARIR) DEYƏRƏK, KATEQORIYANI SİLİR.

**Diqqət**: `createCategory` TƏK saylı `/admin/category`, digər 3-ü isə CƏM saylı `/admin/categories` yolundan istifadə edir — bu, BİZİM SƏHVİMİZ DEYİL, BACKEND-in ÖZ QAYDASIDIR (sənədləşdirilib, `docs/API.md`-yə baxın).

`orderService.ts` bir az FƏRQLİDİR:
```ts
import api from './axiosInstance'
import type { OrderApi, OrderStats, OrderStatus } from '@/types/order'

export const listOrders = () => api.get<OrderApi[]>('/orders/admin')
// Backend may omit some status counters (e.g. CANCELLED) — see docs/API.md §8.2 —
// so the raw fetch is honestly Partial here; Orders.tsx merges it with its own
// client-computed status counts before treating it as a full OrderStats.
export const getOrderStats = () => api.get<Partial<OrderStats>>('/orders/admin/stats')
export const updateOrderStatus = (id: number, status: OrderStatus) =>
  api.put<OrderApi>(`/orders/admin/${id}/status`, { status })
```
`getOrderStats(): Promise<Partial<OrderStats>>` — Hissə 3-DƏKİ `Partial<X>`-Ə BAXIN: "BU SORĞUNUN CAVABI, `OrderStats`-IN SAHƏLƏRİNƏ MALİKDİR, AMMA HAMISI OPSİONALDIR (OLMAYA DA BİLƏR)" DEYİR — ÇÜNKİ BACKEND HƏQİQƏTƏN BƏZƏN BƏZİ STATUS SAYĞACLARINI (MƏS. `CANCELLED`) QAYTARMIR (Hissə 18-DƏ, `Orders.tsx`-İN İZAHINDA, BU PROBLEMİN NECƏ HƏLL OLUNDUĞUNU GÖRƏCƏYİK). `updateOrderStatus(id, status)` — İKİNCİ arqument `payload` obyekti DEYİL, `status: OrderStatus` (TİPLƏNMİŞ, YALNIZ 6 MÜMKÜN DƏYƏRDƏN BİRİ) bir dəyişəndir, AMMA PUT sorğusunun body-si HƏMİŞƏ OBYEKT olmalıdır, ona görə `{ status }` yazılıb — bu, `{ status: status }`-in QISA FORMASIDIR.

`uploadService.ts` isə FƏRQLİ bir NÖV data göndərir:
```ts
import api from './axiosInstance'

interface UploadResponse {
  url: string
}

export const uploadImage = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return api.post<UploadResponse>('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}
```
`file: File` — `File`, BRAUZERİN ÖZ DAXİLİ TİPİDİR ("İSTİFADƏÇİNİN KOMPÜTERİNDƏN SEÇİLƏN BİR FAYL" DEMƏKDİR), TypeScript-in ÖZÜ İLƏ GƏLİR, AYRICA İDXAL EDİLMİR. `interface UploadResponse { url: string }` — BU FAYLA XAS, KİÇİK BİR TİP, `src/types/`-Ə DAŞINMAYIB, ÇÜNKİ BAŞQA HEÇ BİR YERDƏ İSTİFADƏ OLUNMUR (HAZIRDA HEÇ BİR FORMA BU SERVİSİ ÇAĞIRMIR BELƏ, GƏLƏCƏK ÜÇÜN HAZIRDIR). `FormData` — brauzerin daxili bir obyektidir, FAYL göndərmək üçün istifadə olunur (adi JSON YOX). `.append('file', file)` ilə faylı bu obyektə ƏLAVƏ edir, sonra `Content-Type: multipart/form-data` header-i ilə göndərir (server FAYL sorğularını BELƏ gözləyir).

---

## Hissə 10: Adapterlər

**Niyə adapter lazımdır?** Backend datanı BİR FORMATDA göndərir (`img_url`, `created_at`, snake_case sahə adları), amma UI-mizin (forma, cədvəl) İSTİFADƏ ETDİYİ sahə adları FƏRQLİDİR (`imageUrl`, `date`). Adapter faylları BU İKİ FORMAT arasında "tərcüməçi" rolunu OYNAYIR. **TypeScript-lə, HƏR ADAPTER FUNKSİYASI, GİRİŞ VƏ ÇIXIŞ TİPİNİ AÇIQ-AŞKAR BİLDİRİR** — YƏNİ, MƏSƏLƏN, `mapCategoryFromApi`, "MÜTLƏQ `CategoryApi` FORMASINDA BİR ŞEY ALIB, MÜTLƏQ `Category` FORMASINDA BİR ŞEY QAYTARACAĞINI" VƏD EDİR.

### `src/lib/adapters/category.ts`

```ts
import { formatDate } from '@/utils/formatDate'
import type { Category, CategoryApi, CategoryForm, CategoryPayload } from '@/types/category'

const FALLBACK = { image: '🏷️', color: '#f3f4f6' }

export const mapCategoryFromApi = (c: CategoryApi): Category => ({
  id: c.id,
  ...FALLBACK,
  imageUrl: c.img_url || '',
  name: c.name,
  description: c.description,
  date: formatDate(c.created_at),
})

export const mapCategoryToApi = (form: CategoryForm): CategoryPayload => ({
  name: form.name,
  description: form.description,
  img_url: form.imageUrl || '',
})
```

**Sətir-sətir:**
3. `FALLBACK` — API-dən HEÇ VAXT gəlməyən, amma UI-nin gözlədiyi "dekorativ" sahələr (emoji + fon rəngi) — API-də ŞƏKİL yoxdursa, BU EMOJİ göstərilir.
5. **`mapCategoryFromApi = (c: CategoryApi): Category => ({...})`** — BURADA, HƏM PARAMETRİN (`c: CategoryApi`), HƏM DƏ QAYTARILAN DƏYƏRİN (`: Category`) TİPİ AÇIQ YAZILIB. **BUNUN ƏSAS FAYDASI:** ƏGƏR AŞAĞIDA, OBYEKTİN İÇİNDƏ BİR SAHƏNİ SƏHVƏN UNUTSANIZ (MƏS. `description`-U YAZMASANIZ) VƏ YA SƏHV TİPDƏ BİR DƏYƏR VERSƏNİZ (MƏS. `date: 5` — RƏQƏM, STRİNG YOX), TypeScript BUNU DƏRHAL TUTAR — ÇÜNKİ NƏTİCƏ `Category` FORMASINA UYĞUN GƏLMİR.
   - `id: c.id` — dəyişmir, birbaşa köçürülür.
   - `...FALLBACK` — SPREAD ilə `image`/`color` sahələrini BURAYA "tökür" (yuxarıda izah olundu).
   - `imageUrl: c.img_url || ''` — API-nin `img_url`-unu UI-nin `imageUrl`-una köçürür (AD DƏYİŞİR!). `|| ''` — `img_url` `null`/`undefined`/boş STRİNGDİRSƏ, boş STRİNG istifadə olunur (undefined YOX).
   - `date: formatDate(c.created_at)` — API-nin ISO tarixini (`"2025-06-12T05:37:56.753Z"` kimi) OXUNAQLI formata (`"12.06.2025"`) ÇEVİRİR (aşağıda `formatDate` izah olunur).
14. `mapCategoryToApi = (form: CategoryForm): CategoryPayload => ({...})` — TƏRS İSTİQAMƏT: FORMA datasını (UI formatı) API-nin GÖZLƏDİYİ formata ÇEVİRİR — YARADILAN/YENİLƏNƏN kateqoriya BUNUNLA serverə GÖNDƏRİLİR. `image`/`color`/`date` GÖNDƏRİLMİR (API bunları QƏBUL ETMİR, VƏ `CategoryPayload` TİPİNDƏ BU SAHƏLƏR ARTIQ YOXDUR, ONA GÖRƏ YAZMAĞA BELƏ CƏHD ETSƏNİZ, TypeScript XƏTA VERƏR), YALNIZ `name`/`description`/`img_url`.

### `src/lib/adapters/order.ts` (bir az daha MÜRƏKKƏBDİR)

```ts
import { formatDate } from '@/utils/formatDate'
import { PRODUCT_TYPE_LABELS } from '@/lib/constants/productTypes'
import type { Order, OrderApi, OrderItem } from '@/types/order'

const FALLBACK = { image: '📦', color: '#f3f4f6' }

export const mapOrderFromApi = (o: OrderApi): Order => ({
  id: o.id,
  orderNumber: o.orderNumber,
  date: formatDate(o.createdAt),
  address: o.address,
  phone: o.phone,
  paymentMethod: o.paymentMethod === 'CARD' ? 'Kart' : 'Nağd',
  status: o.status,
  subtotal: o.total,
  freeShipping: Number(o.deliveryFee) === 0,
  itemCount: o.items?.length ?? 0,
  user: o.user ?? null,
  items: (o.items ?? []).map((it): OrderItem => {
    const productType = it.product?.type
    return {
      name: it.product?.title ?? '',
      category: it.product?.category?.name ?? '',
      weight: `${it.quantity} ${productType ? PRODUCT_TYPE_LABELS[productType] : ''}`.trim(),
      price: it.product?.price ?? it.total_price,
      unit: productType ? PRODUCT_TYPE_LABELS[productType] : '',
      ...FALLBACK,
    }
  }),
})
```

**Fərqli/mürəkkəb sətirlər:**
- `paymentMethod: o.paymentMethod === 'CARD' ? 'Kart' : 'Nağd'` — API-nin ingiliscə enum-unu (`"CARD"`/başqa) Azərbaycanca sözə ÇEVİRİR. `Order.paymentMethod`-un TİPİ `'Kart' | 'Nağd'` (Hissə 5-Ə BAXIN) — YƏNİ, BU SƏTİR HƏQİQƏTƏN DƏ HƏMİŞƏ BU İKİ MƏTNDƏN BİRİNİ QAYTARMALIDIR, TypeScript BUNU YOXLAYIR.
- `freeShipping: Number(o.deliveryFee) === 0` — `deliveryFee` (çatdırılma haqqı) BİR STRİNGDİRSƏ (`"0.00"`), `Number(...)` onu ƏSL RƏQƏMƏ çevirir, sonra `=== 0` yoxlayır — "haqq sıfırdırsa, pulsuz çatdırılmadır" (`true`/`false`).
- `itemCount: o.items?.length ?? 0` — `o.items` bir MASSİVDİRSƏ, `.length`-i (say) götürür; `o.items` `null`/`undefined`-dırsa `?.` sayəsində XƏTA VERMİR, sonra `?? 0` ilə "0" DEFAULT DƏYƏRİ QOYULUR. (`OrderApi.items?: OrderItemApi[]` — TİPİNDƏ DƏ `?` VAR, ONA GÖRƏ TypeScript BU YOXLAMANI MƏHZ YAZMAĞA MƏCBUR EDİR — YOXLAMASIZ `o.items.length` YAZSANIZ, TypeScript "BU, `undefined` OLA BİLƏR" DEYƏ XƏTA VERƏR.)
- `items: (o.items ?? []).map((it): OrderItem => { ... })` — `o.items` YOXDURSA, BOŞ MASSİV (`[]`) istifadə olunur (ki, `.map()` XƏTA VERMƏSİN), sonra HƏR bir sifariş ELEMENTİNİ (`it`) UI FORMATINA çevirir. `(it): OrderItem =>` — HƏR BİR NƏTİCƏNİN `OrderItem` FORMASINDA OLACAĞINI BİLDİRİR.
- **`const productType = it.product?.type` VƏ SONRA `productType ? PRODUCT_TYPE_LABELS[productType] : ''`** — BU HİSSƏ, JS VERSİYASI İLƏ MÜQAYİSƏDƏ ƏN ÇOX DƏYİŞƏN YERDİR: ƏVVƏLKİ KODDA BİRBAŞA `PRODUCT_TYPE_LABELS[it.product?.type]` YAZILIRDI, AMMA TypeScript BUNA İCAZƏ VERMİR — ÇÜNKİ `it.product?.type`-IN NƏTİCƏSİ `ProductType | undefined`-DIR (MƏHSUL YOXDURSA, TİP DƏ YOXDUR), `PRODUCT_TYPE_LABELS` İSƏ YALNIZ HƏQİQİ `ProductType` DƏYƏRLƏRİ İLƏ "İNDEKSLƏNƏ" BİLƏR, `undefined` İLƏ YOX. Ona görə ƏVVƏLCƏ `productType`-I AYRICA BİR DƏYİŞƏNƏ ÇIXARIRIQ, SONRA `productType ? ... : ''` İLƏ YOXLAYIRIQ (Hissə 3-DƏKİ "DARALTMA" MƏNTİQİ) — YOXLAMADAN SONRA, TypeScript `productType`-IN ARTIQ `undefined` OLMADIĞINI (MƏHZ `ProductType` OLDUĞUNU) BİLİR, VƏ `PRODUCT_TYPE_LABELS[productType]` İNDİ TƏHLÜKƏSİZDİR.
  - `weight: \`${it.quantity} ${...}\`.trim()` — MİQDAR + ölçü VAHİDİNİ ("2 Ədəd" kimi) BİRLƏŞDİRİR. `.trim()` — nəticənin ƏVVƏLİNDƏ/SONUNDA yaranan boşluqları TƏMİZLƏYİR (məs. ölçü tapılmasa boş qalar, ətrafda boşluq qalmasın deyə).
  - `...FALLBACK` — HƏR ELEMENTƏ dekorativ emoji+rəng ƏLAVƏ EDİR (sifariş elementlərinin ÖZ şəkli YOXDUR).

### `src/lib/adapters/product.ts`

```ts
import { formatDate } from '@/utils/formatDate'
import type { Product, ProductApi, ProductForm, ProductPayload } from '@/types/product'

const FALLBACK = { image: '📦', color: '#f3f4f6' }

export const mapProductFromApi = (p: ProductApi): Product => ({
  id: p.id,
  ...FALLBACK,
  imageUrl: p.img_url || '',
  name: p.title,               // DİQQƏT: API "title" adlanır, UI "name" işlədir!
  description: p.description,
  price: p.price,
  type: p.type,
  category: p.category ?? null,      // NESTED (iç-içə) obyekt — {id, name}
  category_id: p.category?.id ?? '', // dropdown üçün, TƏK ID lazımdır
  date: formatDate(p.created_at),
})

export const mapProductToApi = (form: ProductForm): ProductPayload => ({
  title: form.name,                  // GERİYƏ "title"-a çevrilir
  description: form.description,
  price: String(form.price),         // `String(...)` rəqəmi/nə olur-olsun STRİNGƏ ÇEVİRİR
  type: form.type,
  img_url: form.imageUrl || '',
  category_id: Number(form.category_id), // `Number(...)` STRİNGİ RƏQƏMƏ çevirir (HTML select həmişə STRİNG qaytarır)
})
```
`String(form.price)` və `Number(form.category_id)` — HTML formalarındakı DƏYƏRLƏR həmişə STRİNGDİR (hətta `<input type="number">` olsa belə), amma API MÜƏYYƏN sahələrdə DƏQİQ TİP (rəqəm) GÖZLƏYİR — buna görə GÖNDƏRMƏZDƏN ƏVVƏL AÇIQ ÇEVİRİRİK. **`mapProductToApi`-NİN QAYTARDIĞI TİP `ProductPayload`-DUR, HARADA `category_id: number` (STRİNG YOX)** — BU DA `Number(form.category_id)` YAZILMASININ SƏBƏBLƏRİNDƏN BİRİDİR: `form.category_id` (Hissə 5-Ə BAXIN) `number | string` OLA BİLƏR, AMMA `ProductPayload.category_id` MÜTLƏQ `number` OLMALIDIR — `Number(...)` BU ÇEVRİLMƏNİ TƏMİN EDİR VƏ TypeScript-Ə "BU ARTIQ RƏQƏMDİR" DEYİR.

### `src/lib/adapters/user.ts` (ən SADƏSİ)

```ts
import type { User, UserApi } from '@/types/user'

export const mapUserFromApi = (u: UserApi): User => ({
  id: u.id,
  initial: (u.full_name || '?').charAt(0).toUpperCase(),
  color: '#22c55e',
  name: u.full_name,
  phone: u.phone,
  address: u.address || 'Qeyd olunmayıb',
  role: u.role,
})
```
`initial: (u.full_name || '?').charAt(0).toUpperCase()` — İSTİFADƏÇİNİN adının BİRİNCİ HƏRFİNİ (avatar üçün) ÇIXARIR: `u.full_name || '?'` (ad YOXDURSA "?" işarəsi), `.charAt(0)` (BİRİNCİ SİMVOLU götürür), `.toUpperCase()` (BÖYÜK hərfə çevirir). Bu faylda `mapUserToApi` YOXDUR — çünki İstifadəçilər səhifəsi READ-ONLY-dir (yaratmaq/silmək YOXDUR), API-yə HEÇ NƏ GÖNDƏRİLMİR (ONA GÖRƏ `src/types/user.ts`-DƏ DƏ `UserForm`/`UserPayload` TİPLƏRİ YOXDUR — YALNIZ `UserApi` VƏ `User`).

---

## Hissə 11: Sabitlər

### `src/lib/constants/productTypes.ts`

```ts
import type { BadgeColor } from '@/types/common'

export const PRODUCT_TYPE_LABELS = {
  kg: 'Kiloqram',
  gr: 'Qram',
  litre: 'Litr',
  ml: 'Millilitr',
  meter: 'Metr',
  cm: 'Santimetr',
  mm: 'Millimetr',
  piece: 'Ədəd',
  packet: 'Paket',
  box: 'Qutu',
} as const

export type ProductType = keyof typeof PRODUCT_TYPE_LABELS

export const PRODUCT_TYPE_OPTIONS = Object.keys(PRODUCT_TYPE_LABELS) as ProductType[]

const WEIGHT_BASED_TYPES: ProductType[] = ['kg', 'gr', 'litre', 'ml']

export const productTypeBadgeColor = (type: ProductType): BadgeColor =>
  WEIGHT_BASED_TYPES.includes(type) ? 'purple' : 'green'
```
- `PRODUCT_TYPE_LABELS = { ... } as const` — API-nin ENUM DƏYƏRLƏRİNİ (`"kg"`, `"piece"` və s.) Azərbaycanca ETİKETLƏRƏ (`"Kiloqram"`, `"Ədəd"`) BAĞLAYAN xəritə (obyekt). `as const` — Hissə 3-DƏ İZAH OLUNDU: BU OBYEKTİ "SABİT" EDİR Kİ, AŞAĞIDAKI `keyof typeof` TRİKİ İŞLƏSİN.
- `export type ProductType = keyof typeof PRODUCT_TYPE_LABELS` — Hissə 3-DƏKİ `keyof typeof`-A BAXIN: `PRODUCT_TYPE_LABELS`-IN 10 AÇARINDAN (`'kg' | 'gr' | ... | 'box'`) İBARƏT BİR UNION TİPİ YARADIR — BU LAYİHƏNİN İKİNCİ (`OrderStatus`-DAN SONRA) BÖYÜK "ENUM" TİPİDİR.
- `Object.keys(PRODUCT_TYPE_LABELS) as ProductType[]` — obyektin BÜTÜN AÇARLARINI (`['kg', 'gr', 'litre', ...]`) MASSİV kimi qaytarır. `as ProductType[]` LAZIMDIR, ÇÜNKİ `Object.keys(...)`-İN ÖZ TİPİ HƏMİŞƏ SADƏ `string[]`-DİR (TypeScript, OBYEKTİN AÇARLARININ DƏQİQ NƏ OLDUĞUNU RUNTIME-DA "İZLƏYƏ" BİLMİR) — BİZ İSƏ BİLİRİK Kİ, BU KONKRET HALDA NƏTİCƏ MƏHZ `ProductType[]`-DİR. Bu, FORMDAKI `<select>`-in `<option>`-larını YARATMAQ üçün istifadə OLUNUR.
- `WEIGHT_BASED_TYPES.includes(type)` — `.includes(...)` bir massivin MÜƏYYƏN dəyəri EHTİVA edib-etmədiyini yoxlayır (`true`/`false`).
- `productTypeBadgeColor(type: ProductType): BadgeColor` — BİR OX FUNKSİYASI, `type` PARAMETRİNƏ GÖRƏ BADGE RƏNGİNİ ("purple" — çəki əsaslı ölçülər üçün, ya "green" — say əsaslı ölçülər üçün) QAYTARIR. QAYTARILAN TİP `BadgeColor`-DUR (Hissə 5-Ə BAXIN) — YƏNİ, BU FUNKSİYA YALNIZ 5 MÜMKÜN RƏNGDƏN BİRİNİ QAYTARA BİLƏR, İSTƏNİLƏN STRİNG YOX.

### `src/lib/constants/orderStatus.ts`

```ts
import type { BadgeColor } from '@/types/common'

export const ORDER_STATUS_LABELS = {
  PENDING: 'Gözləyir',
  CONFIRMED: 'Təsdiqləndi',
  PREPARING: 'Hazırlanır',
  READY: 'Hazırdır',
  DELIVERED: 'Çatdırıldı',
  CANCELLED: 'Ləğv edildi',
} as const

export type OrderStatus = keyof typeof ORDER_STATUS_LABELS

export const ORDER_STATUS_BADGE_COLOR: Record<OrderStatus, BadgeColor> = {
  PENDING: 'amber',
  CONFIRMED: 'blue',
  PREPARING: 'purple',
  READY: 'blue',
  DELIVERED: 'green',
  CANCELLED: 'red',
}

export const ORDER_STATUS_OPTIONS = Object.keys(ORDER_STATUS_LABELS) as OrderStatus[]
```
YUXARIDAKI ilə EYNİ MƏNTİQ, sadəcə sifariş STATUSLARI üçün. **BİR FƏRQ VAR:** `ORDER_STATUS_BADGE_COLOR: Record<OrderStatus, BadgeColor>` — Hissə 3-DƏKİ `Record`-A BAXIN: BU YAZI SAYƏSİNDƏ, ƏGƏR GƏLƏCƏKDƏ `ORDER_STATUS_LABELS`-Ə YENİ BİR STATUS ƏLAVƏ EDİLSƏ (MƏS. `REFUNDED`), AMMA `ORDER_STATUS_BADGE_COLOR`-A ONUN RƏNGİ ƏLAVƏ EDİLMƏSƏ, TypeScript DƏRHAL XƏTA VERƏCƏK — "YENİ STATUSUN RƏNGİNİ UNUTMAQ" MÜMKÜN DEYİL.

---

## Hissə 12: `formatDate.ts`

```ts
export function formatDate(isoString?: string | null): string {
  if (!isoString) return ''
  const d = new Date(isoString)
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`
}
```
- `formatDate(isoString?: string | null): string` — PARAMETRİN TİPİ `string | null` (Hissə 3-DƏKİ UNION), ÜSTƏLİK `?` DA VAR (OPSİONAL — HEÇ VERİLMƏYƏ DƏ BİLƏR, `undefined` OLA BİLƏR). YƏNİ, `isoString` ÜÇ MÜXTƏLİF "BOŞ" HALDAN BİRİNDƏ OLA BİLƏR: `null`, `undefined`, YA DA BOŞ STRİNG (`''`) — HƏR ÜÇÜNÜ DƏ `if (!isoString)` YOXLAMASI TUTUR (Hissə 2-DƏKİ "FALSY" DƏYƏRLƏRƏ BAXIN). Bu genişlik, ÇAĞIRAN TƏRƏFLƏRDƏ (MƏS. `OrderApi.createdAt` HƏMİŞƏ VAR, AMMA BƏZİ BAŞQA RESURSLARDA TARİX SAHƏSİ NƏZƏRİ OLARAQ BOŞ OLA BİLƏR) RAHATLIQ ÜÇÜNDÜR.
- `if (!isoString) return ''` — TARIX VERİLMƏYİBSƏ (`null`/`undefined`/boş), BOŞ STRİNG QAYTAR (aşağıdakı sətirlər İŞLƏMƏSİN, xəta versin deyə).
- `new Date(isoString)` — API-DƏN GƏLƏN ISO string-i (`"2025-06-12T05:37:56.753Z"`) JavaScript-in daxili `Date` OBYEKTİNƏ çevirir.
- `d.getDate()` — AYIN günü (1-31), `d.getMonth()` — AY (DİQQƏT: 0-DAN başlayır! Yanvar=0, Dekabr=11 — ONA GÖRƏ `+ 1` ƏLAVƏ OLUNUB), `d.getFullYear()` — İL (4 rəqəmli).
- `String(...).padStart(2, '0')` — RƏQƏMİ STRİNGƏ çevirir, sonra `padStart(2, '0')` ilə SOLDAN "0" ilə DOLDURUR ki, HƏMİŞƏ 2 RƏQƏM olsun (`5` → `"05"`, `12` → `"12"`).
- Nəticə: `"12.06.2025"` formatında bir STRİNG (funksiyanın `: string` VƏDİNƏ UYĞUN).

---

## Hissə 13: TanStack Query

### `src/lib/queryClient.ts`

**TanStack Query nə üçündür?** Serverdən data ÇƏKMƏK (fetch), onu YADDAŞDA (cache) SAXLAMAQ, KÖHNƏLƏNDƏ YENİLƏMƏK, YÜKLƏNMƏ/XƏTA vəziyyətlərini İDARƏ ETMƏK — bunların HAMISINI ƏL İLƏ (`useState`+`useEffect` ilə) yazmaq ƏVƏZİNƏ, bu kitabxana HAZIR HƏLL TƏQDİM EDİR.

```ts
import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query'
import { toast } from 'sonner'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 15_000 },
  },
  queryCache: new QueryCache({
    onError: (err) => toast.error(err.message),
  }),
  mutationCache: new MutationCache({
    onError: (err) => toast.error(err.message),
  }),
})
```

**Sətir-sətir:**
- `new QueryClient({...})` — `new` ACHAR SÖZÜ ilə BİR "SİNİF"DƏN (class) YENİ BİR OBYEKT (instans) YARADILIR — `QueryClient` BÜTÜN CACHE-i VƏ AYARLARI SAXLAYAN "BEYİNDİR".
- `defaultOptions.queries.staleTime: 15_000` — `15_000` = 15000 (JavaScript-də ƏDƏDLƏRİN İÇİNDƏ `_` OXUNUŞU ASANLAŞDIRMAQ ÜÇÜN İŞLƏDİLİR, HEÇ BİR RİYAZİ MƏNASI YOXDUR — sadəcə 15000 MİLLİSANİYƏ = 15 SANİYƏ). `staleTime` — BİR DATA ÇƏKİLDİKDƏN SONRA NƏ QƏDƏR MÜDDƏT "TƏZƏ" (fresh) SAYILSIN. 15 SANİYƏ ƏRZİNDƏ EYNİ SƏHİFƏYƏ GERİ QAYITSANIZ, YENİDƏN SORĞU GETMİR, CACHE-DƏKİ DATA GÖSTƏRİLİR.
- `queryCache: new QueryCache({ onError: (err) => toast.error(err.message) })` — BÜTÜN `useQuery` (data OXUMA) sorğuları ÜÇÜN QLOBAL BİR XƏTA-TUTUCU. İSTƏNİLƏN SƏHİFƏDƏ İSTƏNİLƏN `useQuery` XƏTA VERSƏ, BU FUNKSİYA İŞƏ DÜŞÜR, `toast.error(...)` İLƏ BİLDİRİŞ GÖSTƏRİR — HƏR SƏHİFƏDƏ AYRI-AYRI XƏTA İDARƏ ETMƏYƏ EHTİYAC QALMIR. **DİQQƏT — BURADA `err.message` YAZILIB, `err instanceof Error ? ... : ...` YOX** (`Login.tsx`-DƏKİNDƏN FƏRQLİ OLARAQ): BUNUN SƏBƏBİ, `err`-İN TİPİNİN BURADA (TANSTACK QUERY-NİN ÖZ TİPLƏRİNƏ GÖRƏ) ARTIQ `unknown` YOX, BİRBAŞA `Error` KİMİ "İNFER" OLUNMASIDIR (TanStack Query-nin DAXİLİ TİPLƏRİ, `DefaultError = Error` DEYƏ SABİTLƏŞDİRİB) — Hissə 3-DƏKİ `catch (err)` MİSALINDAN FƏRQLİ OLARAQ, BURADA ƏLAVƏ DARALTMAYA EHTİYAC YOXDUR.
- `mutationCache: new MutationCache({ onError: ... })` — EYNİ MƏNTİQ, AMMA `useMutation` (data YAZMA — yaratma/yeniləmə/silmə) ÜÇÜN.

Bu `queryClient` obyekti `App.tsx`-də `<QueryClientProvider client={queryClient}>` İLƏ TƏTBİQƏ "TANIDILIR" (yuxarıda görmüşdük).

---

## Hissə 14: Shared komponentlər

Bu bölmədəki HAMISI `src/shared/components/` qovluğundadır (DİQQƏT: ARTIQ `shared/`-in BİRBAŞA İÇİNDƏ YOX, `components/` ALT-QOVLUĞUNDA — Hissə 4-Ə BAXIN) — TƏTBİQİN İSTƏNİLƏN YERİNDƏ TƏKRAR İSTİFADƏ OLUNAN, "AĞILLI" (data ilə işləməyən, sadəcə görünüş) komponentlərdir.

### `Button.tsx`

```tsx
import type { ComponentPropsWithRef } from 'react'
import type { IconComponent } from '@/types/common'
import styles from './Button.module.css'

interface ButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: 'solid' | 'outline' | 'ghost' | 'ghostDanger'
  icon?: IconComponent
  iconSize?: number
  fullWidth?: boolean
  block?: boolean
}

export default function Button({
  variant = 'solid',
  icon: Icon,
  iconSize = 16,
  fullWidth = false,
  block = false,
  className = '',
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  const classes = [
    styles.btn,
    styles[variant],
    fullWidth ? styles.fullWidth : '',
    block ? styles.block : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} {...rest}>
      {Icon && <Icon size={iconSize} />}
      {children}
    </button>
  )
}
```
- `interface ButtonProps extends ComponentPropsWithRef<'button'> { ... }` — Hissə 3-DƏ ƏTRAFLI İZAH OLUNDU: `ButtonProps`, ADİ `<button>` ELEMENTİNİN BÜTÜN PROP-LARINI (`onClick`, `disabled`, `ref` VƏ S.) "MİRAS ALIR", ÜSTÜNƏ ÖZ 5 ƏLAVƏ PROP-UNU (`variant`, `icon`, `iconSize`, `fullWidth`, `block`) ƏLAVƏ EDİR — HAMISI `?` İLƏ (OPSİONAL), ÇÜNKİ HAMISININ DEFAULT DƏYƏRİ VAR.
- `variant?: 'solid' | 'outline' | 'ghost' | 'ghostDanger'` — Hissə 3-DƏKİ UNION TİP: `Button`-UN DİZAYNDA DƏSTƏKLƏDİYİ 4 GÖRÜNÜŞ VARIANTI (`Button.module.css`-DƏKİ 4 KLASA UYĞUN GƏLİR) — BAŞQA HEÇ BİR MƏTN QƏBUL OLUNMUR (`<Button variant="qırmızı">` YAZSANIZ, TypeScript XƏTA VERƏR).
- `icon?: IconComponent` — Hissə 5-DƏKİ `IconComponent` TİPİ: "BU, `lucide-react`-DAN GƏLƏN, `size`/`color` QƏBUL EDƏN BİR KOMPONENTDİR" DEMƏKDİR.
- `variant = 'solid'` — DESTRUCTURING zamanı `=` İLƏ **DEFAULT DƏYƏR** TƏYİN OLUNUR: `<Button>` İSTİFADƏ EDƏNDƏ `variant` PROP-UNU VERMƏSƏNİZ, AVTOMATİK `'solid'` OLUR.
- `icon: Icon` — DESTRUCTURING İLƏ EYNİ ZAMANDA **YENİDƏN ADLANDIRMA**: PROP-UN ADI `icon`-DUR, AMMA BİZ ONU YEREL DƏYİŞƏN KİMİ `Icon` (BÖYÜK HƏRFLƏ) ADLANDIRIRIQ — ÇÜNKİ JSX-DƏ `<Icon/>` YAZMAQ ÜÇÜN DƏYİŞƏN BÖYÜK HƏRFLƏ BAŞLAMALIDIR (React KİÇİK HƏRFLƏ BAŞLAYANLARI ADİ HTML TEQİ SANIR).
- `...rest` — YUXARIDA İZAH OLUNAN "REST" — `variant`, `icon`, `iconSize` VƏ S. ÇIXARILDIQDAN SONRA, QALAN BÜTÜN PROP-LAR (`onClick`, `disabled`, HƏTTA `ref` DAXİL) `rest` OBYEKTİNƏ YIĞILIR. `ButtonProps`-UN `ComponentPropsWithRef<'button'>`-DAN "MİRAS ALDIĞI" ÜÇÜN, `rest`-İN TİPİ AVTOMATİK OLARAQ DOĞRU (BÜTÜN QALAN BUTTON PROP-LARI) OLUR.
- `classes = [...].filter(Boolean).join(' ')` — BİR NEÇƏ CSS KLASINI ŞƏRTİ OLARAQ BİRLƏŞDİRMƏK ÜÇÜN ÜMUMİ TRİK: MASSİV QURULUR (BƏZİ ELEMENTLƏR BOŞ STRİNG `''` OLA BİLƏR), `.filter(Boolean)` BOŞ STRİNGLƏRİ MASSİVDƏN ÇIXARIR, `.join(' ')` QALANLARI BOŞLUQLA BİRLƏŞDİRİB TƏK STRİNG EDİR.
- `<button type={type} className={classes} {...rest}>` — `{...rest}` BURADA DA SPREAD-DİR, AMMA JSX DAXİLİNDƏ: `rest` OBYEKTİNDƏKİ HƏR AÇAR-DƏYƏRİ BU ELEMENTƏ AYRI-AYRI PROP KİMİ "TÖKÜR".
- `{Icon && <Icon size={iconSize} />}` — `Icon` PROP-U VERİLİBSƏ (İKON KOMPONENTİDİRSƏ), ONU RENDER ET, VERİLMƏYİBSƏ (`undefined`-DURSA) HEÇ NƏ GÖSTƏRMƏ.

**`ref={cancelBtnRef}` KİMİ İSTİFADƏ NECƏ MÜMKÜNDÜR, HALBUKI `Button` "ADİ" BİR FUNKSİYA KOMPONENTDİR?** Köhnə React versiyalarında, BİR FUNKSİYA KOMPONENTİN `ref` QƏBUL ETMƏSİ ÜÇÜN, ONU XÜSUSİ BİR `forwardRef(...)` FUNKSİYASI İLƏ "SARMAQ" LAZIM İDİ. **React 19-DA BU ARTIQ LAZIM DEYİL** — `ref`, ADİ BİR PROP KİMİ QƏBUL OLUNA BİLƏR, TƏKCƏ TİP SƏVİYYƏSİNDƏ `ComponentPropsWithRef<'button'>`-DAN "MİRAS ALMAQ" KİFAYƏTDİR (Hissə 3-Ə BAXIN) Kİ, TypeScript BUNU "TANISIN".

### `Modal.tsx`

```tsx
import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import styles from './Modal.module.css'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children?: ReactNode
  wide?: boolean
}

export default function Modal({ open, onClose, title, children, wide = false }: ModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    closeBtnRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className={styles.overlay}>
      <div className={`${styles.card} ${wide ? styles.cardWide : ''}`} role="dialog" aria-modal="true" aria-label={title}>
        <div className={styles.header}>
          {title ? <h3 className={styles.title}>{title}</h3> : <div />}
          <button type="button" ref={closeBtnRef} onClick={onClose} className={styles.closeBtn} aria-label="Bağla">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
```
- `interface ModalProps { open: boolean; onClose: () => void; title?: string; children?: ReactNode; wide?: boolean }` — `open`/`onClose` MÜTLƏQDİR (`?` YOXDUR — HƏR ÇAĞIRIŞDA VERİLMƏLİDİR), `title`/`children`/`wide` İSƏ OPSİONALDIR.
- `useRef<HTMLButtonElement>(null)` — Hissə 3-DƏKİ GENERİK SİNTAKSİS BURADA DA VAR: "`closeBtnRef`, GƏLƏCƏKDƏ BİR `<button>` DOM ELEMENTİNƏ İŞARƏ EDƏCƏK" DEMƏKDİR. BAŞLANĞICDA `null` (HEÇ BİR ELEMENTƏ QOŞULMAYIB), AMMA `ref={closeBtnRef}` DÜYMƏYƏ VERİLDİKDƏN SONRA, `closeBtnRef.current`-İN TİPİ `HTMLButtonElement | null` OLUR — TypeScript BUNU BİLDİYİ ÜÇÜN, `closeBtnRef.current?.focus()` YAZANDA, `.focus()` METODUNUN DOĞRUDAN DA `HTMLButtonElement`-DƏ MÖVCUD OLDUĞUNU YOXLAYA BİLİR (MƏSƏLƏN, SƏHVƏN `.focusS()` YAZSANIZ, XƏTA TUTULAR).
- `useEffect(() => {...}, [open])` VƏ İKİNCİ `useEffect(() => {...}, [open, onClose])` — Hissə 2-DƏ İZAH OLUNAN İKİ AYRI EFFEKT (BİRİ FOKUSLAMA ÜÇÜN, DİGƏRİ `Escape` DİNLƏYİCİSİ ÜÇÜN) — NİYƏ İKİ AYRI EFFEKTƏ BÖLÜNDÜYÜ (BİRLƏŞDİRİLƏ DƏ BİLƏRDİ) BİR LAYİHƏ QƏRARIDIR: `onClose` FUNKSİYASI HƏR RENDER-DƏ YENİ BİR REFERANS OLA BİLƏR (VALIDEYN KOMPONENTDƏ `() => setFormOpen(false)` KİMİ İNLİNE YAZILDIQDA), BU İSƏ FOKUSLAMA EFFEKTİNİ TƏKRAR-TƏKRAR İŞƏ SALARDI (VƏ MODAL AÇIQ İKƏN, İSTİFADƏÇİ BAŞQA BİR İNPUTA YAZARKƏN, FOKUS SƏHVƏN GERİ BAĞLAMA DÜYMƏSİNƏ QAYIDARDI) — AYRI EFFEKTLƏR BU PROBLEMİN QARŞISINI ALIR.
  - `handleKeyDown = (e: KeyboardEvent) => {...}` — `e: KeyboardEvent`, BRAUZERİN ÖZ TİPİDİR ("BİR KLAVİATURA HADİSƏSİ" DEMƏKDİR), `e.key === 'Escape'` YOXLAMASININ DÜZGÜN İŞLƏMƏSİ ÜÇÜN LAZIMDIR.
- `if (!open) return null` — MODAL BAĞLIDIRSA, HEÇ NƏ RENDER ETMİR.
- `{title ? <h3>...</h3> : <div />}` — BAŞLIQ VERİLİBSƏ GÖSTƏR, VERİLMƏYİBSƏ BOŞ BİR `<div/>` QOY (YERLƏŞMƏ POZULMASIN DEYƏ).
- `{children}` — `<Modal>...BURADA...</Modal>` YAZILANDA, İÇİNDƏKİ HƏR ŞEY `children` PROP-U KİMİ GƏLİR VƏ BURADA RENDER OLUNUR.

### `ConfirmModal.tsx`

`Modal.tsx` İLƏ EYNİ MƏNTİQ (ESCAPE, FOKUS), AMMA AYRICA, DAHA SADƏ BİR KOMPONENTDİR — "ƏMİNSİNİZMİ?" TİPLİ SUALLAR ÜÇÜN:
```ts
interface ConfirmModalProps {
  open: boolean
  onCancel: () => void
  onConfirm: () => void
  message: string
}
```
FƏRQİ: `role="alertdialog"` (ADİ DİALOQ DEYİL, XƏBƏRDARLIQ DİALOQU) VƏ `<Button ref={cancelBtnRef}>` — BURADA `Button`-UN YUXARIDA İZAH OLUNAN `ComponentPropsWithRef` XÜSUSİYYƏTİ İSTİFADƏ OLUNUR: `Button` ADİ FUNKSİYA KOMPONENTİDİR (`forwardRef`-SİZ), AMMA REACT 19 + `ComponentPropsWithRef<'button'>` SAYƏSİNDƏ `ref`-İ BİLƏVASİTƏ QƏBUL EDƏ BİLİR VƏ `...rest`-İN İÇİNDƏ `<button>`-Ə ÖTÜRÜLÜR.

### `Badge.tsx`

```tsx
import type { ReactNode } from 'react'
import type { BadgeColor } from '@/types/common'
import styles from './Badge.module.css'

interface BadgeProps {
  color?: BadgeColor
  children: ReactNode
}

export default function Badge({ color = 'green', children }: BadgeProps) {
  return <span className={`${styles.badge} ${styles[color]}`}>{children}</span>
}
```
`color?: BadgeColor` — Hissə 5-DƏKİ `BadgeColor` UNION TİPİ (`'green' | 'blue' | 'amber' | 'purple' | 'red'`) — BURADA, `ORDER_STATUS_BADGE_COLOR`-DA, VƏ `productTypeBadgeColor`-UN QAYTARDIĞI DƏYƏRDƏ **EYNİ TİP** İSTİFADƏ OLUNUR (Hissə 5-Ə BAXIN) — YƏNİ, ƏGƏR BİRİSİ SƏHVƏN "YELLOW" (BU 5 RƏNGDƏ OLMAYAN BİR RƏNG) YAZSA, İSTƏR `Badge`-Ə BİRBAŞA PROP KİMİ, İSTƏRSƏ DƏ `ORDER_STATUS_BADGE_COLOR`-UN İÇİNDƏ, TypeScript EYNİ ANDA TUTAR. `styles[color]` — DİNAMİK KLAS SEÇİMİ: `color` PROP-U `"green"`, `"blue"`, `"amber"` VƏ S. OLA BİLƏR, `styles[color]` HƏMİN ADLI CSS KLASINI OXUYUR.

### `StatCard.tsx`

```tsx
import type { ReactNode } from 'react'
import type { IconComponent } from '@/types/common'
import styles from './StatCard.module.css'

interface StatCardProps {
  label: ReactNode
  value: ReactNode
  icon: IconComponent
  color: string
}

export default function StatCard({ label, value, icon: Icon, color }: StatCardProps) {
  return (
    <div className={styles.card}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>
        <Icon size={16} color={color} />
        {value}
      </span>
    </div>
  )
}
```
SADƏ BİR "KART" — ETİKET (`label`), RƏQƏM (`value`) VƏ RƏNGLİ İKON GÖSTƏRİR. `icon: IconComponent` — DİQQƏT, `Button`-DAN FƏRQLİ OLARAQ, BURADA `icon` **OPSİONAL DEYİL** (`?` YOXDUR) — ÇÜNKİ `StatCard` HEÇ VAXT İKONSUZ İSTİFADƏ OLUNMUR, ONA GÖRƏ TİP DƏ BUNU "MƏCBURİ" EDİR (İKONSUZ ÇAĞIRSANIZ, TypeScript XƏTA VERƏR — BU, RUNTIME-DA "İKON UNDEFINED-DIR" DEYƏ ÇÖKMƏNİN QARŞISINI ƏVVƏLCƏDƏN ALIR). ORDERS SƏHİFƏSİNDƏKİ 6 STATİSTİKA KARTI BUNDAN İSTİFADƏ EDİR.

### `Thumbnail.tsx`

```tsx
import type { ReactNode } from 'react'
import styles from './Thumbnail.module.css'

interface ThumbnailProps {
  imageUrl?: string
  image?: ReactNode
  color?: string
  size?: 'sm' | 'lg'
}

export default function Thumbnail({ imageUrl, image, color, size = 'sm' }: ThumbnailProps) {
  return (
    <span className={`${styles.thumb} ${styles[size]}`} style={{ backgroundColor: color }}>
      {imageUrl ? <img src={imageUrl} alt="" className={styles.img} /> : image}
    </span>
  )
}
```
`size?: 'sm' | 'lg'` — İKİ ÖLÇÜ VARIANTI (Hissə 3-DƏKİ UNION), CƏDVƏL XANALARI ÜÇÜN `'sm'` (DEFAULT), DETAL MODALLARI ÜÇÜN `'lg'`. `imageUrl ? <img .../> : image` — ƏSL ŞƏKİL ÜNVANI (`imageUrl`) VARSA `<img>` TEQİ İLƏ GÖSTƏRİR, YOXDURSA `image` (EMOJİ, MƏSƏLƏN "📦") MƏTN KİMİ GÖSTƏRİLİR.

### `ActionMenu.tsx` (ən MÜRƏKKƏB SHARED KOMPONENT)

```tsx
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { MoreVertical, Eye, Pencil, Trash2 } from 'lucide-react'
import styles from './ActionMenu.module.css'

interface ActionMenuProps {
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

export default function ActionMenu({ onView, onEdit, onDelete }: ActionMenuProps) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const openMenu = () => {
    const rect = triggerRef.current!.getBoundingClientRect()
    const menuWidth = 150
    setPos({
      top: rect.bottom + 4,
      left: Math.max(8, rect.right - menuWidth),
    })
    setOpen(true)
  }

  useEffect(() => {
    if (!open) return undefined

    const handlePointerDown = (e: MouseEvent) => {
      const target = e.target as Node
      if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) return
      setOpen(false)
    }
    const handleScroll = () => setOpen(false)

    document.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('scroll', handleScroll, true)
    window.addEventListener('resize', handleScroll)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('scroll', handleScroll, true)
      window.removeEventListener('resize', handleScroll)
    }
  }, [open])

  const handleSelect = (fn?: () => void) => {
    setOpen(false)
    fn?.()
  }

  return (
    <>
      <button type="button" ref={triggerRef} onClick={() => (open ? setOpen(false) : openMenu())} aria-label="Əməliyyatlar">
        <MoreVertical size={18} />
      </button>
      {open &&
        createPortal(
          <div ref={menuRef} className={styles.menu} style={{ top: pos.top, left: pos.left }}>
            <button onClick={() => handleSelect(onView)}><Eye size={14} /> Bax</button>
            <button onClick={() => handleSelect(onEdit)}><Pencil size={14} /> Düzəlt</button>
            <button onClick={() => handleSelect(onDelete)}><Trash2 size={14} /> Sil</button>
          </div>,
          document.body,
        )}
    </>
  )
}
```

Bu, CƏDVƏLLƏRDƏKİ "ÜÇ NÖQTƏ" (⋮) MENYUSUDUR (Bax/Düzəlt/Sil).

- `onView?: () => void` (VƏ EYNİLƏ `onEdit`, `onDelete`) — ÜÇÜ DƏ OPSİONALDIR (`?`), ÇÜNKİ, MƏSƏLƏN, BƏZİ SƏHİFƏLƏR `ActionMenu`-NU YALNIZ BƏZİ ƏMƏLİYYATLARLA İSTİFADƏ EDƏ BİLƏR (PRAKTİKADA HAMISI VERİLİR, AMMA TİP SƏVİYYƏSİNDƏ MƏCBURİ DEYİL).
- `triggerRef = useRef<HTMLButtonElement>(null)` / `menuRef = useRef<HTMLDivElement>(null)` — İKİ AYRI `useRef`, İKİSİ DƏ FƏRQLİ DOM ELEMENT TİPLƏRİNƏ İŞARƏ EDİR (`HTMLButtonElement` VƏ `HTMLDivElement`) — BİRİ "⋮" DÜYMƏSİNƏ, DİGƏRİ AÇILAN MENYUNUN ÖZÜNƏ.
- `triggerRef.current!.getBoundingClientRect()` — **`!` (NON-NULL ASSERTION)** BURADA VAR: `openMenu()` FUNKSİYASI YALNIZ DÜYMƏ ARTIQ EKRANDA OLANDA (İSTİFADƏÇİ ONA KLİK EDƏNDƏ) ÇAĞIRILIR, ONA GÖRƏ `triggerRef.current`-İN O ANDA `null` OLA BİLMƏYƏCƏYİNƏ ƏMİNİK — BUNU `!` İLƏ TypeScript-Ə BİLDİRİRİK (Hissə 6-DAKI `document.getElementById('root')!` İLƏ EYNİ MƏNTİQ).
- `handlePointerDown = (e: MouseEvent) => { const target = e.target as Node; ... }` — `e.target`-İN ÖZÜ, BRAUZERİN TİPLƏRİNƏ GÖRƏ, ÇOX GENİŞ BİR TİPDƏDİR (`EventTarget`) — `.contains(...)` METODU İSƏ MƏHZ `Node` TİPİ GÖZLƏYİR, ONA GÖRƏ `as Node` İLƏ DAR BİR TİPƏ "ÇEVİRİRİK" (BU DA TƏHLÜKƏSİZ BİR `as`-DIR, ÇÜNKİ BRAUZERDƏ HƏR HADİSƏ HƏDƏFİ (`target`) HƏMİŞƏ DƏ BİR `Node`-DUR).
- `handleSelect = (fn?: () => void) => {...}` — PARAMETR `fn?: () => void` — OPSİONAL BİR FUNKSİYA (ÇÜNKİ `onView`/`onEdit`/`onDelete` DA OPSİONALDIR).
- **`createPortal(...)` NƏ ÜÇÜNDÜR?** NORMAL HALDA, JSX ELEMENTLƏRİ ÖZ "VALIDEYN" ELEMENTİNİN İÇİNDƏ RENDER OLUNUR. AMMA BU MENYU BİR CƏDVƏL XANASININ (`<td>`) İÇİNDƏDİR, CƏDVƏL İSƏ SCROLL OLAN BİR QUTUYA BÜRÜNÜB — ƏGƏR MENYU O QUTUNUN İÇİNDƏ QALSAYDI, "KƏSİLƏRDİ" (GÖRÜNMƏZ OLARDI). `createPortal(jsxElementi, document.body)` — BU JSX-İ, REACT AĞACINDA HARADA OLMASINDAN ASILI OLMAYARAQ, DOM-DA BİRBAŞA `<body>`-NİN İÇİNƏ "IŞIN" EDİR.
- `<>...</>` — **FRAGMENT**DİR. REACT-DƏ BİR KOMPONENT YALNIZ BİR "KÖK" ELEMENT QAYTARA BİLƏR — AMMA BURADA HƏM DÜYMƏ, HƏM DƏ (ŞƏRTİ) MENYU EYNİ SƏVİYYƏDƏ OLMALIDIR, ONA GÖRƏ "GÖRÜNMƏZ" BİR SARĞI KİMİ `<>...</>` (FRAGMENT) İŞLƏDİLİR.

### `Table.tsx`

```tsx
import type { ReactNode } from 'react'
import type { Column } from '@/types/common'
import styles from './Table.module.css'

interface TableProps {
  columns: Column[]
  minWidth?: number
  children?: ReactNode
}

export function Table({ columns, minWidth = 720, children }: TableProps) {
  return (
    <div className={styles.scroll}>
      <table className={styles.table} style={{ minWidth }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={{ width: col.width }}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

interface TableEmptyRowProps {
  colSpan: number
  children?: ReactNode
}

export function TableEmptyRow({ colSpan, children = 'Nəticə tapılmadı' }: TableEmptyRowProps) {
  return (
    <tr className={styles.emptyRow}>
      <td colSpan={colSpan}>{children}</td>
    </tr>
  )
}

export default Table
```
BU FAYL **İKİ NAMED EXPORT** (`Table`, `TableEmptyRow`) VƏ BİR **DEFAULT EXPORT** (`Table`-IN ÖZÜ) VERİR. `columns: Column[]` — Hissə 5-DƏ TƏYİN OLUNAN `Column` TİPİ, HƏR SƏHİFƏNİN ÖZ `columns` MASSİVİ MƏHZ BU FORMAYA UYĞUN OLMALIDIR (`{key: string; label: ReactNode; width?: number | string}`). **`Table` KOMPONENTİ, NİYƏ GENERİK (`Table<T>`) DEYİL?** Hissə 5-DƏ QEYD OLUNDU: `columns[].key`-DƏN HEÇ VAXT SƏTIR DATASINA "İNDEKSLƏMƏK" ÜÇÜN İSTİFADƏ OLUNMUR (HƏR SƏHİFƏ ÖZ `<tr>`-LƏRİNİ ƏLLƏ YAZIR), YALNIZ REACT `key` + GÖRÜNTÜ ETİKETİ ÜÇÜNDÜR — ONA GÖRƏ GENERİK ETMƏK ARTIQ (LAZIMSIZ) MÜRƏKKƏBLİK OLARDI, HEÇ BİR HƏQİQİ SƏHVİ TUTMAZDI.

`Table` KOMPONENTİ ÖZÜ DATA "BİLMİR" — SƏHİFƏLƏR ONA `columns` (SÜTUN TƏSVİRLƏRİ) VƏ `children` (CƏDVƏLİN SƏTİRLƏRİ, YƏNİ `<tr>...</tr>` ELEMENTLƏRİ) VERİR, O SADƏCƏ `<thead>`-İ `columns`-DAN AVTOMATİK QURUR, `<tbody>`-NİN İÇİNƏ İSƏ `children`-İ QOYUR.

`TableEmptyRow` — SİYAHI BOŞ OLANDA ("Nəticə tapılmadı") GÖSTƏRİLƏN XÜSUSİ SƏTİR. `colSpan: number` — MÜTLƏQDİR (BOŞ SƏTRİN NEÇƏ SÜTUNU "TUTACAĞINI" BİLDİRİR), `children = 'Nəticə tapılmadı'` — DEFAULT MƏTN, İSTƏSƏNİZ FƏRQLİ MƏTN VERƏ BİLƏRSİNİZ.

**Cədvəlin SCROLL DAVRANIŞI haqqında qısa qeyd:** `.scroll` (`Table.module.css`-də) `flex: 1` OLARAQ TƏYİN OLUNUB — BU SƏBƏBDƏN, SƏHİFƏNİN BÜTÖV HÜNDÜRLÜYÜ SABİT QALIR, ARTIQ SƏTİR OLANDA CƏDVƏL ÖZÜ (SƏHİFƏ YOX) İÇƏRİDƏ SÜRÜŞDÜRÜLÜR (Hissə 17-DƏ, CSS BÖLMƏSİNDƏ, ƏTRAFLI İZAH OLUNUR — BU, TAMAMİLƏ CSS MƏSƏLƏSİDİR, TypeScript-Ə AİD DEYİL).

### `Loading.tsx`

```tsx
import styles from './Loading.module.css'

interface LoadingProps {
  fullScreen?: boolean
}

export default function Loading({ fullScreen = false }: LoadingProps) {
  return (
    <div className={`${styles.wrap} ${fullScreen ? styles.fullScreen : ''}`}>
      <span className={styles.spinner} />
      <span className={styles.text}>Yüklənir...</span>
    </div>
  )
}
```
SPİNNER (FIRLANAN DAİRƏ) VƏ MƏTN — CSS-DƏ (`Loading.module.css`) `border` XASSƏSİNDƏN İSTİFADƏ EDİLİB. `fullScreen` PROP-U İKİ FƏRQLİ REJİM ÜÇÜNDÜR: `false` (DEFAULT) — SƏHİFƏNİN İÇİNDƏ KİÇİK GÖRÜNÜŞ; `true` — BÜTÜN EKRANI ORTALAYIB TUTAN GÖRÜNÜŞ (ROUTE DƏYİŞƏNDƏ `Suspense` FALLBACK-I KİMİ İSTİFADƏ OLUNUR).

### `ErrorBoundary.tsx`

```tsx
import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { ServerCrash } from 'lucide-react'
import Button from '@/shared/components/Button/Button'
import styles from './ErrorBoundary.module.css'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  override state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info)
  }

  override render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div className={styles.page}>
        <span className={styles.badge}><ServerCrash size={32} /></span>
        <h1 className={styles.title}>Nəsə səhv getdi</h1>
        <p className={styles.text}>Sorğunu yerinə yetirmək mümkün olmadı. Bir az sonra yenidən cəhd edin.</p>
        <Button onClick={() => (window.location.href = '/sifarisler')}>Ana səhifəyə qayıt</Button>
      </div>
    )
  }
}
```

**BU FAYL, LAYİHƏDƏ YEGANƏ "CLASS KOMPONENT"DİR** — BÜTÜN DİGƏR HƏR ŞEY FUNKSİYA KOMPONENTLƏRİDİR. SƏBƏBİ: REACT-DA "ERROR BOUNDARY" (XƏTA TUTUCUSU) YALNIZ CLASS KOMPONENT KİMİ YAZILA BİLƏR.

- `class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState>` — **`<ErrorBoundaryProps, ErrorBoundaryState>`** — Hissə 3-DƏKİ GENERİK SİNTAKSİS, İKİ TİP PARAMETRİ İLƏ: BİRİNCİSİ (`ErrorBoundaryProps`) — BU KOMPONENTİN QƏBUL ETDİYİ PROP-LAR, İKİNCİSİ (`ErrorBoundaryState`) — BU KOMPONENTİN DAXİLİ "STATE"İ (`useState`-İN CLASS VERSİYASI). React-IN ÖZ `Component` SİNFİ MƏHZ BU İKİ GENERİK PARAMETRİ QƏBUL EDİR.
- `override state: ErrorBoundaryState = { hasError: false }` — `override` (Hissə 3-Ə BAXIN, `noImplicitOverride` AYARI TƏLƏB EDİR, ÇÜNKİ `state` React-IN ÖZ `Component` SİNFİNDƏ ARTIQ MÖVCUDDUR) — BAŞLANĞICDA XƏTA YOXDUR.
- `static getDerivedStateFromError(): ErrorBoundaryState` — REACT-IN ÖZÜ ÇAĞIRDIĞI XÜSUSİ BİR METODDUR (`static` OLDUĞU ÜÇÜN `override` YAZILMIR — STATİK ÜZVLƏR `override` QAYDASINA TABE DEYİL): BU KOMPONENTİN **İSTƏNİLƏN UŞAĞINDA** BİR JAVASCRIPT XƏTASI BAŞ VERƏNDƏ, REACT AVTOMATİK BUNU ÇAĞIRIR, QAYTARILAN OBYEKT YENİ `state` OLUR.
- `override componentDidCatch(error: Error, info: ErrorInfo)` — EYNİ ANDA İŞƏ DÜŞƏN DİGƏR BİR METOD, XƏTANI (VƏ ONUN "STACK" MƏLUMATINI, `info: ErrorInfo` — React-IN ÖZ TİPİ) KONSOLA YAZMAQ ÜÇÜN İSTİFADƏ OLUNUR.
- `override render()` — CLASS KOMPONENTLƏRDƏ JSX QAYTARAN METODDUR.
  - `if (!this.state.hasError) return this.props.children` — XƏTA YOXDURSA, SADƏCƏ NORMAL UŞAQLARI GÖSTƏR.
  - XƏTA VARSA, ONUN ƏVƏZİNƏ BU "FALLBACK" EKRANI GÖSTƏRİR.
  - `onClick={() => (window.location.href = '/sifarisler')}` — DİQQƏT: `useNavigate()` YOX, ÇÜNKİ HOOK-LAR YALNIZ FUNKSİYA KOMPONENTLƏRİNDƏ İŞLƏYİR, CLASS KOMPONENTDƏ YOX.
  - `this.state.hasError` / `this.props.children` — CLASS KOMPONENTLƏRDƏ `state`/`props`-A HƏMİŞƏ `this.` İLƏ MÜRACİƏT OLUNUR.

**Harada istifadə olunur?** `main.tsx`-də `<ErrorBoundary><App/></ErrorBoundary>` — BÜTÜN TƏTBİQİ ƏHATƏ EDİR.

---

## Hissə 15: Custom hooks

Bu 4 hook, `src/shared/hooks/` qovluğundadır (`components/`-DAN AYRI, Hissə 4-Ə BAXIN) — HAMISI **generik**DİR (Hissə 3-Ə BAXIN), ÇÜNKİ HƏR BİRİ, "HANSI DATA İLƏ İŞLƏDİYİNDƏN ASILI OLMAYARAQ", EYNİ ŞƏKİLDƏ İŞLƏMƏLİDİR.

### `useTitle.ts`

```ts
import { useEffect } from 'react'

export function useTitle(title?: string): void {
  useEffect(() => {
    const previousTitle = document.title
    document.title = title ? `${title} · Tik Tak Admin` : 'Tik Tak Admin'

    return () => {
      document.title = previousTitle
    }
  }, [title])
}
```
`useTitle(title?: string): void` — BURADA GENERİK YOXDUR (Hissə 3-DƏ QEYD OLUNDU: `useTitle` YEGANƏ HOOK-DUR Kİ, GENERİK OLMASINA EHTİYAC DUYMUR, ÇÜNKİ HƏMİŞƏ SADƏCƏ `string` İLƏ İŞLƏYİR). `title?: string` — OPSİONALDIR (VERİLMƏSƏ, DEFAULT BAŞLIQ İSTİFADƏ OLUNUR). `document.title` — BRAUZERİN TAB BAŞLIĞIDIR. `previousTitle` — DƏYİŞDİRMƏZDƏN ƏVVƏLKİ BAŞLIĞI YADDA SAXLAYIR. `return () => { document.title = previousTitle }` — CLEANUP FUNKSİYASI: KOMPONENT EKRANDAN GEDƏNDƏ, TAB BAŞLIĞINI KÖHNƏ HALINA QAYTARIR. HƏR SƏHİFƏ ÖZ ADI İLƏ `useTitle('Kateqoriyalar')` ÇAĞIRIR.

### `useDebounce.ts`

```ts
import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}
```
**"Debounce" NƏ DEMƏKDİR?** İSTİFADƏÇİ AXTARIŞ QUTUSUNA YAZANDA, HƏR HƏRFDƏ SERVERƏ SORĞU GETSƏ, ÇOX LAZIMSIZ SORĞU OLARDI. DEBOUNCE — "İSTİFADƏÇİ YAZMAĞI DAYANDIRDIQDAN MÜƏYYƏN MÜDDƏT (500ms) SONRA DAVRAN" DEMƏKDİR.

`useDebounce<T>(value: T, delay = 500): T` — **`<T>` GENERİK, ÇÜNKİ BU HOOK, PRİNSİPCƏ, İSTƏNİLƏN TİPDƏ BİR DƏYƏRİ "GECİKDİRƏ" BİLƏR** (BU LAYİHƏDƏ HƏMİŞƏ `string` İLƏ ÇAĞIRILIR — AXTARIŞ MƏTNİ ÜÇÜN — AMMA HOOK-UN ÖZÜ BUNA MƏHDUD DEYİL). `T`-NİN NƏ OLDUĞU, ÇAĞIRILAN YERDƏ AVTOMATİK MÜƏYYƏNLƏŞİR: `useDebounce(search, 500)` (`search: string`) ÇAĞIRANDA, `T = string` OLUR, NƏTİCƏDƏ QAYTARILAN DƏYƏR DƏ `string`-DİR.
- `setTimeout(() => setDebouncedValue(value), delay)` — `delay` (500) MİLLİSANİYƏ SONRA, `debouncedValue`-Nİ CARİ `value`-YA BƏRABƏRLƏŞDİRƏCƏK BİR "SAAT" QURUR.
- `return () => clearTimeout(timeout)` — CLEANUP: ƏGƏR `value` 500ms BİTMƏMİŞ YENƏ DƏYİŞSƏ (İSTİFADƏÇİ YENİDƏN YAZIRSA), ƏVVƏLKİ "SAAT" LƏĞV OLUNUR, YENİSİ BAŞLAYIR — BELƏLİKLƏ YALNIZ İSTİFADƏÇİ 500ms ƏRZİNDƏ HEÇ NƏ YAZMASA, `debouncedValue` YENİLƏNİR.
- İSTİFADƏ: `AdminLayout.tsx`-də `useDebounce(search, 500)` — AXTARIŞ MƏTNİ ANINDA STATE-Ə YAZILIR, AMMA SƏHİFƏLƏRƏ ÖTÜRÜLƏN "DEBOUNCED" DƏYƏR YALNIZ 500ms SONRA YENİLƏNİR.

### `usePagination.ts`

```ts
import { useState } from 'react'

export function usePagination<T>(items: T[], initialPageSize = 5) {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSizeState] = useState(initialPageSize)

  const setPageSize = (size: number) => {
    setPageSizeState(size)
    setPage(1)
  }

  const paged = items.slice((page - 1) * pageSize, page * pageSize)

  return { page, setPage, pageSize, setPageSize, paged }
}
```
`usePagination<T>(items: T[], initialPageSize = 5)` — **BU LAYİHƏNİN ƏN AYDIN GENERİK MİSALIDIR** (Hissə 3-Ə BAXIN): `items: T[]` — "İSTƏNİLƏN TİPDƏN MASSİV" (`Category[]`, `Product[]`, `User[]` — HANSI SƏHİFƏDƏ İSTİFADƏ OLUNSA), `T` HƏMİN SƏHİFƏNİN ÖZÜNDƏ AVTOMATİK MÜƏYYƏNLƏŞİR. **DİQQƏT — QAYTARILAN OBYEKTİN ÖZÜNƏ `: {...}` KİMİ AÇIQ TİP YAZILMAYIB** — TypeScript ÖZÜ, FUNKSİYANIN İÇİNDƏKİ HƏR DƏYİŞƏNDƏN (MƏS. `paged: T[]`, ÇÜNKİ `items.slice(...)`-İN NƏTİCƏSİ DƏ `T[]`-DİR) NƏTİCƏ OBYEKTİNİN FORMASINI "İNFER" EDİR (Hissə 3-DƏKİ "TİP İNFERENCE"-Ə BAXIN) — BU, HOOK-LARDA ÇOX TƏBİİ BİR PATTERNDIR, HƏR YERDƏ AÇIQ TİP YAZMAĞA EHTİYAC YOXDUR.
- `items` — TAM (FİLTRLƏNMİŞ) SİYAHI, `initialPageSize` — BAŞLANĞIC SƏHİFƏ ÖLÇÜSÜ (DEFAULT 5).
- `page`/`pageSize` — İKİ AYRI `useState`, CARİ SƏHİFƏ NÖMRƏSİ VƏ SƏHİFƏ BAŞINA NEÇƏ ELEMENT GÖSTƏRİLƏCƏYİ.
- `setPageSize(size: number)` — **ÖZ FUNKSİYAMIZDIR** (`useState`-İN ÖZ SETTER-İ DEYİL, BİZ YAZMIŞIQ) — SƏHİFƏ ÖLÇÜSÜNÜ DƏYİŞDİRİR VƏ EYNİ ZAMANDA `page`-İ 1-Ə QAYTARIR.
- `paged = items.slice((page - 1) * pageSize, page * pageSize)` — TAM SİYAHINI, CARİ SƏHİFƏYƏ UYĞUN HİSSƏYƏ "KƏSİR". `paged`-İN TİPİ, `items: T[]`-DƏN AVTOMATİK OLARAQ `T[]`-DİR — YƏNİ, `Category[]` VERSƏNİZ, `paged` DƏ `Category[]` OLUR (`any[]` YOX).
- SON SƏTİR — OBYEKT QAYTARIR, SƏHİFƏLƏR BUNU `const { page, setPage, pageSize, paged } = usePagination(filtered)` ŞƏKLİNDƏ DESTRUCTURE EDİB İSTİFADƏ EDİR.

### `useCrudModal.ts`

```ts
import { useState } from 'react'

export function useCrudModal<TItem, TForm>(emptyForm: TForm, toForm: (item: TItem) => TForm) {
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<TItem | null>(null)
  const [form, setForm] = useState<TForm>(emptyForm)
  const [deleteTarget, setDeleteTarget] = useState<TItem | null>(null)
  const [viewTarget, setViewTarget] = useState<TItem | null>(null)

  const openCreate = (overrides: Partial<TForm> = {}) => {
    setEditing(null)
    setForm({ ...emptyForm, ...overrides })
    setFormOpen(true)
  }

  const openEdit = (item: TItem) => {
    setEditing(item)
    setForm(toForm(item))
    setFormOpen(true)
  }

  return { formOpen, setFormOpen, editing, form, setForm, deleteTarget, setDeleteTarget, viewTarget, setViewTarget, openCreate, openEdit }
}
```
BU HOOK, KATEQORİYALAR/KAMPANİYALAR/MƏHSULLAR SƏHİFƏLƏRİNİN **ÜÇÜNDƏ DƏ EYNİ OLAN** "YARAT/DÜZƏLT/SİL/BAX" MODAL MƏNTİQİNİ BİR YERƏ YIĞIR.

**`<TItem, TForm>` — NİYƏ İKİ AYRI GENERİK (BİR YOX)?** Çünki `TItem` (SİYAHI ELEMENTİ, MƏS. `Product`) VƏ `TForm` (FORMANIN ÖZÜ, MƏS. `ProductForm`) **FƏRQLİ FORMALARDIR** (Hissə 5-DƏ, `ProductForm.category_id`-İN `Product.category_id`-DƏN NİYƏ FƏRQLİ OLDUĞUNU GÖRDÜK) — TƏK BİR GENERİK (`<T>`) KİFAYƏT ETMƏZDİ, ÇÜNKİ O ZAMAN `editing: T` İLƏ `form: T` EYNİ TİPDƏ OLARDI, HALBUKI ONLAR HƏQİQƏTƏN FƏRQLİDİR.
- `emptyForm: TForm` — BAŞLANĞIC (BOŞ) FORMA DƏYƏRLƏRİ, `TForm` TİPİNDƏ.
- `toForm: (item: TItem) => TForm` — Hissə 3-DƏKİ "FUNKSİYA TİPİ": "BİR `TItem` ALIB, BİR `TForm` QAYTARAN FUNKSİYA" — SƏHİFƏNİN ÖZÜNÜN VERDİYİ ÇEVİRMƏ FUNKSİYASI (MƏS. `Categories.tsx`-DƏKİ `toForm`).
- 5 `useState` — `formOpen` (FORMA MODALI AÇIQDIRMI, `boolean`), `editing: TItem | null` (HANSI ELEMENT DÜZƏLDİLİR — `null`-DURSA "YENİ YARATMA" REJİMİDİR), `form: TForm` (FORMANIN CARİ DƏYƏRLƏRİ), `deleteTarget: TItem | null` (SİLİNMƏK İSTƏNƏN ELEMENT), `viewTarget: TItem | null` (BAXILAN ELEMENT).
- `openCreate(overrides: Partial<TForm> = {})` — Hissə 3-DƏKİ `Partial<X>`-Ə BAXIN: "`overrides`, `TForm`-UN İSTƏNİLƏN (BƏLKƏ DƏ HEÇ BİR) SAHƏSİNİ QISMƏN VERƏ BİLƏR" DEMƏKDİR — YENİ ELEMENT YARATMAQ ÜÇÜN FORMANI AÇIR: `editing`-İ `null` EDİR, `form`-U `emptyForm`-A (BAŞLANĞIC BOŞ DƏYƏRLƏR) QAYTARIR — AMMA `{ ...emptyForm, ...overrides }` İLƏ, ÇAĞIRAN TƏRƏF ƏLAVƏ SPESİFİK DƏYƏRLƏR (`overrides`) VERƏ BİLƏR (MƏSƏLƏN, PRODUCTS SƏHİFƏSİ `openCreate({ category_id: '...' })` ÇAĞIRIR Kİ, DEFAULT KATEQORİYA SEÇİLİ GƏLSİN — `Partial<ProductForm>` TİPİ SAYƏSİNDƏ, `{ category_id: '...' }` KİMİ "QISMƏN" BİR OBYEKT VERMƏK İCAZƏLİDİR, BÜTÜN SAHƏLƏRİ TƏKRAR YAZMAĞA EHTİYAC YOXDUR).
- `openEdit(item: TItem)` — MÖVCUD bir elementi düzəltmək üçün: `editing`-İ O ELEMENTƏ QOYUR, `form`-U İSƏ `toForm(item)` İLƏ DOLDURUR.

---

## Hissə 16: `Pagination.tsx`

`src/utils/Pagination/Pagination.tsx` — **KOMPONENTDİR** (YUXARIDAKI `usePagination` HOOK-U İLƏ QARIŞDIRMAYIN, İKİSİ FƏRQLİ ŞEYDİR).

```tsx
import { ChevronLeft, ChevronRight } from 'lucide-react'
import styles from './Pagination.module.css'

interface PaginationProps {
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
  onPageSizeChange?: (size: number) => void
}

export default function Pagination({ page, pageSize, total, onPageChange, onPageSizeChange }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1
  const end = Math.min(total, page * pageSize)

  const pageNumbers: (number | '...')[] = []
  for (let p = 1; p <= totalPages; p += 1) {
    if (p === 1 || p === totalPages || Math.abs(p - page) <= 1) {
      pageNumbers.push(p)
    } else if (pageNumbers[pageNumbers.length - 1] !== '...') {
      pageNumbers.push('...')
    }
  }

  return (
    <div className={styles.wrap}>
      <span>{start}-{end} / {total} nəticə</span>
      <div className={styles.pages}>
        <button disabled={page <= 1} onClick={() => onPageChange(page - 1)}><ChevronLeft size={16} /></button>
        {pageNumbers.map((p, idx) =>
          p === '...' ? <span key={`dots-${idx}`}>…</span> : (
            <button key={p} onClick={() => onPageChange(p)} className={p === page ? styles.pageBtnActive : ''}>{p}</button>
          ),
        )}
        <button disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}><ChevronRight size={16} /></button>
      </div>
      {onPageSizeChange && (
        <select value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))}>
          <option value={5}>5 / page</option>
          <option value={10}>10 / page</option>
          <option value={20}>20 / page</option>
        </select>
      )}
    </div>
  )
}
```

- `onPageChange: (page: number) => void` VƏ `onPageSizeChange?: (size: number) => void` — BİRİ MÜTLƏQ (`onPageChange`), DİGƏRİ OPSİONAL (`onPageSizeChange` — YALNIZ ORDERS SƏHİFƏSİ VERİR, Hissə 18-Ə BAXIN).
- `const pageNumbers: (number | '...')[] = []` — Hissə 3-DƏKİ UNION-A BAXIN: BU MASSİVİN HƏR ELEMENTİ YA BİR RƏQƏM (SƏHİFƏ NÖMRƏSİ), YA DA DƏQİQ `'...'` MƏTNİDİR (BAŞQA HEÇ NƏ) — TypeScript BUNU AYRICA YAZMASAQ, `[]`-DƏN "İSTƏNİLƏN MASSİV" (GENİŞ, FAYDASIZ BİR TİP) DEYƏ İNFER EDƏRDİ, ONA GÖRƏ BURADA AÇIQ TİP LAZIM GƏLİB.
- `totalPages = Math.max(1, Math.ceil(total / pageSize))` — `Math.ceil` YUXARIYA YUVARLAQLAŞDIRIR. `Math.max(1, ...)` — HƏTTA `total=0` OLSA BELƏ, ƏN AZI 1 SƏHİFƏ GÖSTƏRİR.
- `start`/`end` — "1-5 / 23 nəticə" KİMİ MƏTNİN RƏQƏMLƏRİNİ HESABLAYIR.
- `for (let p = 1; p <= totalPages; p += 1)` — KLASSİK "FOR DÖVRÜ".
- `if (p === 1 || p === totalPages || Math.abs(p - page) <= 1)` — HANSI SƏHİFƏ NÖMRƏLƏRİ GÖRSƏNSİN QƏRARI: BİRİNCİ SƏHİFƏ, SON SƏHİFƏ, VƏ CARİ SƏHİFƏNİN ±1 ƏTRAFINDAKILAR.
- `else if (pageNumbers[pageNumbers.length - 1] !== '...')` — ARTIQ SONUNCU ƏLAVƏ EDİLƏN "..." DEYİLSƏ, BİR "..." ƏLAVƏ ET.

**`Pagination.tsx` (komponent) VS `usePagination.ts` (hook) — FƏRQ NƏDİR?**
- `usePagination` — **MƏNTİQ**DİR. `useState` İLƏ `page`/`pageSize`-İ SAXLAYIR, MASSİVİ `.slice()` EDİR. HEÇ BİR JSX/GÖRÜNÜŞ YOXDUR.
- `Pagination` — **GÖRÜNÜŞ**DÜR. DÜYMƏLƏR, SƏHİFƏ NÖMRƏLƏRİ, "5/page" SEÇİCİSİ. ÖZ STATE-İ YOXDUR, HƏR ŞEYİ PROP KİMİ ALIR.

BİR SƏHİFƏ İKİSİNİ **BİRLİKDƏ** İŞLƏDİR: `usePagination` DATA KƏSİR, `Pagination` KOMPONENTİ İSƏ ONUN NƏTİCƏSİNİ (`page`, `pageSize`, `total`) GÖSTƏRİR VƏ KLİKLƏRİ (`onPageChange`) GERİ HOOK-A ÖTÜRÜR.

---

## Hissə 17: Layout

### `src/layouts/AdminLayout.tsx`

```tsx
import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '@/components/Sidebar/Sidebar'
import Header from '@/components/Header/Header'
import { useDebounce } from '@/shared/hooks/useDebounce'
import type { LayoutOutletContext } from '@/types/common'
import styles from './AdminLayout.module.css'

export default function AdminLayout() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)
  const { pathname } = useLocation()

  useEffect(() => {
    setSearch('')
  }, [pathname])

  return (
    <div className={styles.page}>
      <div className={styles.headerBar}>
        <div className={styles.headerInner}>
          <Header search={search} onSearchChange={setSearch} />
        </div>
      </div>
      <div className={styles.bodyBar}>
        <div className={styles.bodyInner}>
          <Sidebar />
          <main className={styles.main}>
            <Outlet context={{ search: debouncedSearch } satisfies LayoutOutletContext} />
          </main>
        </div>
      </div>
    </div>
  )
}
```
BU, 5 QORUNAN SƏHİFƏNİN "ÇƏRÇİVƏSİDİR" — SIDEBAR + HEADER + AXTARIŞ MƏNTİQİ.

- `search` — İNPUT-DAKI XAM (ANINDA YENİLƏNƏN) MƏTN. `useDebounce(search, 500)` — Hissə 15-DƏ İZAH OLUNAN GENERİK HOOK, BURADA `T = string` OLARAQ İŞLƏYİR.
- `<Header search={search} onSearchChange={setSearch} />` — HEADER-Ə XAM MƏTNİ VƏ ONU DƏYİŞMƏK FUNKSİYASINI ÖTÜRÜR.
- **`<Outlet context={{ search: debouncedSearch } satisfies LayoutOutletContext} />`** — Hissə 3-DƏ İZAH OLUNAN `satisfies` OPERATORU MƏHZ BURADA İŞLƏDİLİR: `{search: debouncedSearch}` OBYEKTİNİN, `LayoutOutletContext` (Hissə 5-Ə BAXIN, `{search: string}`) TİPİNƏ **DƏQİQ UYĞUN OLDUĞUNU** TƏSDİQLƏYİR. `context` — react-router-dom-un XÜSUSİ BİR MEXANİZMİDİR: `AdminLayout`-UN İÇİNDƏ RENDER OLUNAN İSTƏNİLƏN SƏHİFƏ `useOutletContext<LayoutOutletContext>()` HOOK-U İLƏ BU OBYEKTİ OXUYA BİLİR — BELƏLİKLƏ AXTARIŞ MƏTNİ VALİDEYNDƏN (LAYOUT-DAN) UŞAQLARA (SƏHİFƏLƏRƏ) "PROP DRILLING" (ƏL-ƏL ÖTÜRMƏ) OLMADAN ÇATIR. **DİQQƏT — `useOutletContext<LayoutOutletContext>()`-DƏKİ `<LayoutOutletContext>` VƏ BURADAKI `satisfies LayoutOutletContext` İKİ AYRI YERDƏ, EYNİ TİPƏ İŞARƏ EDİR** — BİRİ "GÖNDƏRƏN" (PRODUCER) TƏRƏFİ, DİGƏRİ "QƏBUL EDƏN" (CONSUMER) TƏRƏFİ TİPLƏYİR, İKİSİ EYNİ TİP OLMASA, TypeScript UYĞUNSUZLUĞU TUTARDI.
- **`useLocation()` + `useEffect(() => setSearch(''), [pathname])`** — BU, BİR REAL BUQ-UN DÜZƏLİŞİDİR: `AdminLayout` SƏHİFƏLƏR ARASI KEÇİDDƏ (MƏS. `/istifadeciler`-DƏN `/sifarisler`-Ə) YENİDƏN MOUNT OLMUR (SADƏCƏ `<Outlet/>`-İN İÇİ DƏYİŞİR), ONA GÖRƏ `search` STATE-İ ÖZÜ-ÖZÜNƏ SIFIRLANMIR. BUNSUZ, MƏSƏLƏN İSTİFADƏÇİLƏR SƏHİFƏSİNDƏ BİR ADI AXTARIB SONRA BAŞQA SƏHİFƏYƏ KEÇSƏNİZ, HƏMİN KÖHNƏ AXTARIŞ MƏTNİ O SƏHİFƏNİN ÖZ FİLTERİNƏ DƏ TƏTBİQ OLUNURDU (ÇÜNKİ EYNİ `debouncedSearch` DƏYƏRİ `LayoutOutletContext` VASİTƏSİLƏ BÜTÜN SƏHİFƏLƏRƏ GEDİR) — NƏTİCƏDƏ HEÇ NƏ UYĞUN GƏLMİR, CƏDVƏL BOŞ GÖRÜNÜRDÜ, VƏ YALNIZ SƏHİFƏNİ YENİLƏMƏK (`search` STATE-İ SIFIRDAN BAŞLADIĞI ÜÇÜN) BUNU "DÜZƏLDİRDİ". `useLocation()`-DAN GƏLƏN `pathname` HƏR ROUTE DƏYİŞƏNDƏ FƏRQLİ OLUR, ONA GÖRƏ `[pathname]` DEPENDENCY-Sİ İLƏ, HƏR SƏHİFƏ KEÇİDİNDƏ `setSearch('')` AVTOMATİK ÇAĞIRILIR.

### `src/components/Sidebar/Sidebar.tsx`

BU FAYL, NAV LİNKLƏRİ + LOGOUT DÜYMƏSİ + **HOVER PREFETCH** (SİÇAN LİNKİN ÜZƏRİNƏ GƏLƏNDƏ DATA ƏVVƏLCƏDƏN ÇƏKMƏK) MƏNTİQİNİ SAXLAYIR.

```tsx
import { NavLink, useNavigate } from 'react-router-dom'
import { useQueryClient, type QueryClient } from '@tanstack/react-query'
import { ClipboardList, Megaphone, Tags, Package, Users, LogOut } from 'lucide-react'
// ... (servis/adapter idxalları)

const navItems = [
  { to: '/sifarisler', label: 'Sifarişlər', icon: ClipboardList },
  // ... digər 4 nav elementi
]

const PREFETCH: Record<string, (queryClient: QueryClient) => void> = {
  '/sifarisler': (queryClient) => {
    queryClient.prefetchQuery({ queryKey: ['orders'], queryFn: () => listOrders().then((data) => data.map(mapOrderFromApi)) })
    queryClient.prefetchQuery({ queryKey: ['orderStats'], queryFn: getOrderStats })
  },
  // ... digər 4 route üçün oxşar
}

export default function Sidebar() {
  const navigate = useNavigate()
  const logout = useAuthStore((s) => s.logout)
  const queryClient = useQueryClient()

  return (
    <aside className={styles.aside}>
      <nav className={styles.nav}>
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onMouseEnter={() => PREFETCH[to]?.(queryClient)}
            className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`}
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
      <button onClick={() => { logout(); navigate('/login') }} className={styles.logoutBtn}>
        <LogOut size={18} /> Çıxış
      </button>
    </aside>
  )
}
```
- **`PREFETCH: Record<string, (queryClient: QueryClient) => void>`** — Hissə 3-DƏKİ `Record`-A BAXIN: "AÇARLARI STRİNG (ROUTE YOLLARI), DƏYƏRLƏRİ İSƏ `QueryClient` ALIB HEÇ NƏ QAYTARMAYAN FUNKSİYALAR OLAN BİR OBYEKT" DEMƏKDİR. `QueryClient` — TANSTACK QUERY-NİN ÖZ TİPİDİR (`type QueryClient` OLARAQ İDXAL OLUNUB, Hissə 3-DƏKİ `import type`-A BAXIN). HƏR FUNKSİYA `queryClient.prefetchQuery({...})` ÇAĞIRIR — BU, `useQuery`-YƏ ÇOX BƏNZƏYİR, AMMA KOMPONENTİN İÇİNDƏN DEYİL, İMPERATİV (BİRBAŞA) ÇAĞIRILIR VƏ NƏTİCƏNİ RENDER ETMİR, SADƏCƏ CACHE-Ə YAZIR.
- `queryKey`/`queryFn` — **EYNİ DƏYƏRLƏR** HƏMİN SƏHİFƏNİN ÖZ `useQuery` ÇAĞIRIŞINDA DA İŞLƏDİLİR (BU, VACİBDİR — CLAUDE.md-DƏKİ "Data fetching" BÖLMƏSİNƏ BAXIN, TypeScript BUNU ÖZÜ AVTOMATİK YOXLAMIR, PROQRAMÇI DİQQƏTLİ OLMALIDIR).
- `{navItems.map(({ to, label, icon: Icon }) => ...)}` — `navItems` MASSİVİNİ GƏZİB, HƏR BİRİ ÜÇÜN BİR `<NavLink>` YARADIR.
- `onMouseEnter={() => PREFETCH[to]?.(queryClient)}` — SİÇAN LİNKİN ÜZƏRİNƏ GƏLƏNDƏ, `PREFETCH` OBYEKTİNDƏN O YOLA (`to`) UYĞUN FUNKSİYANI TAPIB (`?.` İLƏ — TAPILMASA XƏTA VERMİR, Hissə 3-DƏKİ `noUncheckedIndexedAccess` AYARINA GÖRƏ, `PREFETCH[to]`-UN NƏTİCƏSİ NƏZƏRİ OLARAQ `undefined` DƏ OLA BİLƏR) ÇAĞIRIR.
- `className={({ isActive }) => ...}` — `NavLink`-İN XÜSUSİ BİR XÜSUSİYYƏTİDİR: `className` PROP-UNA STRİNG ƏVƏZİNƏ BİR FUNKSİYA VERİLƏ BİLƏR, BU FUNKSİYA `{ isActive }` (CARİ URL BU LİNKƏ UYĞUNDURMU, `boolean`) ALIR VƏ UYĞUN KLASI QAYTARIR — react-router-dom-un ÖZ TİPLƏRİ `isActive`-İN `boolean` OLDUĞUNU AVTOMATİK TƏMİN EDİR.
- `onClick={() => { logout(); navigate('/login') }}` — ƏVVƏLCƏ `logout()` (ZUSTAND STORE-U TƏMİZLƏYİR), SONRA `navigate('/login')` (BROWSER-İ `/login`-Ə APARIR).

### `src/components/Header/Header.tsx`

```tsx
interface HeaderProps {
  search: string
  onSearchChange?: (value: string) => void
}

export default function Header({ search, onSearchChange }: HeaderProps) {
  // ...
  <input value={search} onChange={(e) => onSearchChange?.(e.target.value)} ... />
}
```
SADƏ BİR KOMPONENT — BAŞLIQ + AXTARIŞ İNPUTU. `search: string` MÜTLƏQDİR (`AdminLayout`-DAN GƏLİR), `onSearchChange` İSƏ OPSİONALDIR (`?.()` İLƏ ÇAĞIRILIR — Hissə 2-Ə BAXIN). ÖZ STATE-İ YOXDUR — "CONTROLLED INPUT" NÜMUNƏSİDİR: `value={search}` İLƏ İNPUTUN DƏYƏRİ TAM OLARAQ REACT STATE-İNDƏN İDARƏ OLUNUR, `onChange` HƏR HƏRFDƏ `onSearchChange` (YƏNİ `AdminLayout`-UN `setSearch`-İ) ÇAĞIRIR.

---

## Hissə 18: Səhifələr

### `src/pages/Login/Login.tsx`

TAM BİR SƏHİFƏ NÜMUNƏSİ OLARAQ, BUNU DA SƏTİR-SƏTİR İZAH EDİRİK.

```tsx
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
// ... digər idxallar

export default function Login() {
  useTitle('Giriş')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!phone.trim() || !password.trim()) {
      toast.error('Telefon və parolu daxil edin')
      return
    }
    setLoading(true)
    try {
      await login(phone.trim(), password)
      navigate('/sifarisler', { replace: true })
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Xəta baş verdi')
    } finally {
      setLoading(false)
    }
  }

  return (
    // ... JSX (aşağıda ayrıca izah olunur)
  )
}
```
- `useTitle('Giriş')` — TAB BAŞLIĞINI "Giriş · Tik Tak Admin" EDİR.
- 4 `useState` — TELEFON, PAROL, "PAROLU GÖSTƏR" VƏZİYYƏTİ, VƏ "YÜKLƏNİR" VƏZİYYƏTİ. HAMISI `useState('')`/`useState(false)` ŞƏKLİNDƏ, TypeScript BAŞLANĞIC DƏYƏRDƏN (`''` → `string`, `false` → `boolean`) ÖZÜ TİPİ "İNFER" EDİR, AYRICA YAZMAĞA EHTİYAC YOXDUR.
- **`handleSubmit = async (e: FormEvent<HTMLFormElement>) => {...}`** — `FormEvent<HTMLFormElement>`, React-IN ÖZ TİPİDİR: "BİR `<form>` ELEMENTİNDƏN GƏLƏN, `submit` HADİSƏSİ" DEMƏKDİR — BU TİP OLMASA, `e.preventDefault()` YAZANDA TypeScript "`e`-NİN BELƏ BİR METODU OLDUĞUNU BİLMİR" DEYƏ XƏTA VERƏRDİ.
  - `e.preventDefault()` — HTML FORMALARININ DEFAULT DAVRANIŞI SƏHİFƏNİ TAM YENİDƏN YÜKLƏMƏKDİR — BU SƏTİR ONUN QARŞISINI ALIR.
  - `if (!phone.trim() || !password.trim())` — BOŞDURSA, XƏTA TOAST-I GÖSTƏRİLİR VƏ `return` İLƏ FUNKSİYA BURADA DAYANIR.
  - `await login(phone.trim(), password)` — `useAuthStore`-DAKI `login` FUNKSİYASINI ÇAĞIRIR (Hissə 8-Ə BAXIN, TİPİ `(phone: string, password: string) => Promise<void>`-DİR) VƏ NƏTİCƏNİ GÖZLƏYİR.
  - UĞURLU OLSA: `navigate('/sifarisler', { replace: true })` — İSTİFADƏÇİNİ SİFARİŞLƏR SƏHİFƏSİNƏ APARIR.
  - **UĞURSUZ OLSA (`catch (err)`): `err instanceof Error ? err.message : 'Xəta baş verdi'`** — Hissə 3-DƏ ƏTRAFLI İZAH OLUNAN, `catch`-DƏKİ `unknown` TİPİNİN "DARALDILMASI" MİSALIDIR. `axiosInstance.ts` HƏMİŞƏ SADƏ BİR `Error` OBYEKTİ "ATDIĞI" ÜÇÜN, PRAKTİKADA BU YOXLAMA HƏMİŞƏ DOĞRU ÇIXIR, AMMA TypeScript-Ə GÖRƏ, NƏZƏRİ OLARAQ, `catch`-Ə İSTƏNİLƏN ŞEY DÜŞƏ BİLƏR, ONA GÖRƏ YOXLAMA MƏCBURİDİR.
  - `finally { setLoading(false) }` — İSTƏR UĞURLU, İSTƏR UĞURSUZ, DÜYMƏNİ YENİDƏN AKTİV EDİR.

**JSX HİSSƏSİ:** `Phone`/`Lock` İKONLARI, `showPassword ? 'text' : 'password'` İLƏ PAROLU GÖSTƏRMƏ/GİZLƏTMƏ, `setShowPassword((s) => !s)` İLƏ KEÇİD — BUNLARIN HEÇ BİRİ TypeScript-Ə XAS DEYİL (Hissə 2-DƏKİ TERNAR/FUNKSİYA-FORMASI STATE YENİLƏMƏYƏ BAXIN), ONA GÖRƏ BURADA TƏKRARLANMIR.

### `src/pages/NotFound/NotFound.tsx`

ÇOX SADƏDİR — 404 İKONU, MƏTN, VƏ "ANA SƏHİFƏYƏ QAYIT" DÜYMƏSİ (`useNavigate()` İLƏ, ÇÜNKİ BU BİR FUNKSİYA KOMPONENTDİR, `ErrorBoundary`-DƏN FƏRQLİ OLARAQ HOOK İŞLƏDƏ BİLİR). HEÇ BİR ƏLAVƏ TİP YAZILMAYIB — KOMPONENTİN PROP-U YOXDUR.

### `src/pages/protected/Categories/Categories.tsx` — CƏMİYYƏTİN ƏSAS CRUD NÜMUNƏSİ

BU SƏHİFƏ, "CRUD" (Create/Read/Update/Delete — Yarat/Oxu/Yenilə/Sil) NÜMUNƏSİNİN ƏN TİPİK MİSALIDIR — CAMPAIGNS VƏ PRODUCTS SƏHİFƏLƏRİ DƏ EYNİ QURULUŞU TƏKRARLAYIR (KİÇİK FƏRQLƏRLƏ).

```tsx
import type { FormEvent } from 'react'
import type { Column, LayoutOutletContext } from '@/types/common'
import type { Category, CategoryForm, CategoryPayload } from '@/types/category'

const emptyForm: CategoryForm = { image: '🏷️', color: '#f3f4f6', imageUrl: '', name: '', description: '' }

const toForm = (item: Category): CategoryForm => ({
  image: item.image, color: item.color, imageUrl: item.imageUrl || '',
  name: item.name, description: item.description,
})

const columns: Column[] = [ /* cədvəl sütunları */ ]

export default function Categories() {
  useTitle('Kateqoriyalar')
  const { search } = useOutletContext<LayoutOutletContext>()
  const queryClient = useQueryClient()

  const { data: categories = [], isLoading: loading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => listCategories().then((data) => data.map(mapCategoryFromApi)),
  })
```
- `emptyForm: CategoryForm` — FORMA "YARAT" REJİMİNDƏ AÇILANDA BAŞLANĞIC (BOŞ) DƏYƏRLƏR. TİP AÇIQ YAZILIB (`: CategoryForm`) — ƏGƏR HANSISA SAHƏNİ UNUTSANIZ (MƏS. `description`-U YAZMAĞI YADDAN ÇIXARSANIZ), TypeScript DƏRHAL TUTAR.
- `toForm = (item: Category): CategoryForm => ({...})` — Hissə 10-DA İZAH OLUNDU (`useCrudModal`-A VERİLİR), BİR SİYAHI ELEMENTİNİ FORMA STRUKTURUNA ÇEVİRİR.
- `columns: Column[]` — Hissə 5-DƏKİ `Column` TİPİ.
- `useOutletContext<LayoutOutletContext>()` — Hissə 17-DƏ İZAH OLUNAN, `AdminLayout`-DAN GƏLƏN AXTARIŞ MƏTNİNİ (DEBOUNCED) OXUYUR.
- `useQuery({ queryKey: ['categories'], queryFn: ... })` — TANSTACK QUERY-NİN ƏSAS HOOK-UDUR. `queryFn`-İN NƏTİCƏSİ (`listCategories().then((data) => data.map(mapCategoryFromApi))`) AVTOMATİK OLARAQ `Category[]`-DİR (ÇÜNKİ `listCategories(): Promise<CategoryApi[]>`, `.map(mapCategoryFromApi)` İSƏ HƏR ELEMENTİ `CategoryApi`-DƏN `Category`-YƏ ÇEVİRİR) — `data: categories = []` DESTRUCTURE EDİLƏNDƏ, `categories`-İN TİPİ DƏ AVTOMATİK `Category[]` OLUR, HEÇ BİR ƏLAVƏ TİP YAZILMASINA EHTİYAC QALMIR (`useQuery<Category[]>(...)` YAZMAQ LAZIM DEYİL — Hissə "TypeScript Policy"YƏ BAXIN, CLAUDE.md-DƏ QEYD OLUNUB: TİPLƏR ARTIQ `services`/`adapters`-DAN "AXIR").

```tsx
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['categories'] })
  const createMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: async () => {
      await invalidate()
      toast.success('Kateqoriya yaradıldı')
    },
  })
  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: CategoryPayload }) => updateCategory(id, payload),
    onSuccess: async () => {
      await invalidate()
      toast.success('Kateqoriya yeniləndi')
    },
  })
```
- `invalidate` — KİÇİK BİR KÖMƏKÇİ FUNKSİYA, `['categories']` KEY-İNİ "KÖHNƏLMİŞ" (STALE) ELAN EDİR — TANSTACK QUERY AVTOMATİK YENİDƏN SORĞU GÖNDƏRİR VƏ SİYAHI TƏZƏLƏNİR.
- `createMutation` — `mutationFn: createCategory` YAZILIB, ÇÜNKİ `createCategory`-NİN ÖZÜNÜN TİPİ (`(payload: CategoryPayload) => Promise<CategoryApi>`, Hissə 9-A BAXIN) ARTIQ DÜZGÜNDÜR, ƏLAVƏ SARĞI FUNKSİYAYA EHTİYAC YOXDUR.
- **`updateMutation`-DA İSƏ `mutationFn: ({ id, payload }: { id: number; payload: CategoryPayload }) => updateCategory(id, payload)`** — BURADA ƏLAVƏ BİR "SARĞI" FUNKSİYASI LAZIM GƏLİB, ÇÜNKİ `updateCategory`-NİN ÖZÜ İKİ AYRI PARAMETR (`id`, `payload`) ALIR, AMMA `useMutation`-UN `mutate({...})` ÇAĞIRIŞI YALNIZ **TƏK BİR** ARQUMENT QƏBUL EDİR — ONA GÖRƏ, O TƏK ARQUMENTİ (`{id, payload}` OBYEKTİ) DESTRUCTURE EDİB, İKİ AYRI PARAMETRƏ "BÖLƏN" BİR ARA FUNKSİYA YAZILIB. `{ id: number; payload: CategoryPayload }` — BU OBYEKTİN TİPİ BURADA, İNLİNE (BAŞQA YERDƏ AYRICA TƏYİN OLUNMADAN) YAZILIB, ÇÜNKİ YALNIZ BU BİR YERDƏ İSTİFADƏ OLUNUR.
- **XƏTA** HAL ÜÇÜN AYRICA HEÇ NƏ YAZILMAYIB — ÇÜNKİ `queryClient.ts`-DƏKİ QLOBAL `mutationCache.onError` HAMISI ÜÇÜN AVTOMATİK İŞLƏYİR (Hissə 13-Ə BAXIN).

```tsx
  const filtered = useMemo(
    () => categories.filter((c) => `${c.name} ${c.description}`.toLowerCase().includes(search.toLowerCase())),
    [categories, search],
  )
  const { page, setPage, pageSize, paged } = usePagination(filtered)

  const {
    formOpen, setFormOpen, editing, form, setForm, deleteTarget, setDeleteTarget, viewTarget, setViewTarget, openCreate, openEdit,
  } = useCrudModal<Category, CategoryForm>(emptyForm, toForm)
```
- `filtered` — `categories`-İ AXTARIŞ MƏTNİNƏ GÖRƏ FİLTRLƏYİR. TİPİ AVTOMATİK `Category[]`-DİR (`categories.filter(...)` ARTIQ EYNİ TİPİ QAYTARIR).
- `usePagination(filtered)` — Hissə 15-Ə BAXIN, `T = Category` OLARAQ İŞLƏYİR, ÇÜNKİ `filtered: Category[]`.
- **`useCrudModal<Category, CategoryForm>(emptyForm, toForm)`** — Hissə 15-DƏ İZAH OLUNAN İKİ-GENERİKLİ HOOK, BURADA AÇIQ-AŞKAR `<Category, CategoryForm>` İLƏ ÇAĞIRILIR (BAŞQA HOOK-LARDAN FƏRQLİ OLARAQ, BURADA GENERİK PARAMETRLƏRİ AÇIQ YAZMAQ ADƏTİDİR — ÇÜNKİ `emptyForm`/`toForm`-UN ÖZÜNDƏN TypeScript HƏR İKİ TİPİ "İNFER" ETSƏ DƏ, AÇIQ YAZMAQ OXUNUŞU ASANLAŞDIRIR VƏ SƏHVƏN YANLIŞ TİP GEDİB-GƏLMƏSİNİN QARŞISINI ALIR).

```tsx
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const payload = mapCategoryToApi(form)
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id, payload })
      } else {
        await createMutation.mutateAsync(payload)
      }
      setFormOpen(false)
    } catch {
      // error already toasted by the global mutation cache
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    try {
      await deleteMutation.mutateAsync(deleteTarget.id)
    } catch {
      // error already toasted by the global mutation cache
    } finally {
      setDeleteTarget(null)
    }
  }

  const submitting = createMutation.isPending || updateMutation.isPending
```
- `mapCategoryToApi(form)` — FORMA datasını (`CategoryForm`) API FORMATINA (`CategoryPayload`) ÇEVİRİR (Hissə 10-A BAXIN).
- `if (editing) {...} else {...}` — `editing: Category | null` `null` DEYİLSƏ (YƏNİ `openEdit`-DƏN GƏLİBSƏ), YENİLƏMƏ MUTASİYASINI, YOXSA (`openCreate`-DƏN GƏLİBSƏ) YARATMA MUTASİYASINI ÇAĞIRIR. `if (editing)` YOXLAMASINDAN SONRA, TypeScript `editing`-İN ARTIQ `null` OLMADIĞINI (MƏHZ `Category` OLDUĞUNU) BİLİR, ONA GÖRƏ `editing.id`-Ə TƏHLÜKƏSİZ MÜRACİƏT OLUNUR.
- `updateMutation.mutateAsync({ id: editing.id, payload })` — `mutateAsync` — `useMutation`-UN QAYTARDIĞI OBYEKTİN BİR METODUDUR, MUTASİYANI BAŞLADIR VƏ **PROMISE QAYTARIR** (`mutate` DA VAR, AMMA O PROMISE QAYTARMIR — BİZ `await` EDƏ BİLMƏK ÜÇÜN `mutateAsync` İŞLƏDİRİK).
- `catch {}` — BOŞ CATCH BLOKU: MUTASİYA XƏTA VERSƏ, BURAYA DÜŞÜR, AMMA HEÇ NƏ ETMİR — TƏK MƏQSƏD: `setFormOpen(false)` SƏTRİNİN İŞƏ DÜŞMƏMƏSİNİ TƏMİN ETMƏK.
- **`confirmDelete`-DƏ `if (!deleteTarget) return`** — BU, JS VERSİYASINDA YOX İDİ (BİRBAŞA `deleteTarget.id` YAZILIRDI), AMMA TypeScript-Ə GÖRƏ `deleteTarget`-İN TİPİ `Category | null`-DİR — `deleteTarget.id` YAZMAZDAN ƏVVƏL, ONUN `null` OLMADIĞINI YOXLAMAQ MƏCBURİDİR (BU, HƏM DƏ, PRAKTİKADA, BAYAĞI BİR "TƏHLÜKƏSİZLİK ŞƏBƏKƏSİDİR" — ÇAĞIRILDIĞI YERDƏN (`ConfirmModal`-IN `onConfirm`-U) MƏNTİQƏN HƏMİŞƏ `deleteTarget` DOLU OLMALIDIR, AMMA TypeScript BUNU "BİLMİR", ONA GÖRƏ YOXLAMA TƏLƏB EDİR).
- `submitting` — İKİ MUTASİYADAN (`create`/`update`) HANSISA HAZIRDA "İŞLƏYİRSƏ" (`isPending`), `true` OLUR.

**JSX HİSSƏSİ (QISA):** `openCreate()`, `<Table columns={columns}>`, `<ActionMenu onView={...} onEdit={...} onDelete={...}>`, `<Modal>`/`<ConfirmModal>` — HAMISI YUXARIDA (Hissə 14) İZAH OLUNAN KOMPONENTLƏRDİR, PROP-LARI ARTIQ TİPLƏNMİŞ FORMADA GƏLİR. FORMANIN ÖZÜNDƏ, HƏR `<input>` `value={form.X}` + `onChange={(e) => setForm((f) => ({ ...f, X: e.target.value }))}` NÜMUNƏSİNİ TƏKRARLAYIR — BU, **"CONTROLLED INPUT"** DEYİLƏN ÜMUMİ REACT NÜMUNƏSİDİR (Hissə 2-Ə BAXIN). `setForm((f) => ({ ...f, X: e.target.value }))` — `setForm`-UN TİPİ `Dispatch<SetStateAction<CategoryForm>>`-DİR (`useCrudModal`-DAN GƏLİR), ONA GÖRƏ `f` PARAMETRİ AVTOMATİK `CategoryForm` OLARAQ "İNFER" OLUNUR, VƏ NƏTİCƏ OBYEKTİ DƏ (`{...f, X: ...}`) YENƏ `CategoryForm`-A UYĞUN OLMALIDIR.

### `Campaigns.tsx` və `Products.tsx` — Categories ilə FƏRQLƏR

**`Campaigns.tsx`** — QURULUŞ 1:1 EYNİDİR, SADƏCƏ:
- `name`/`description` ƏVƏZİNƏ `title`/`description` (KAMPANİYALARIN "ADI" API-DƏ `title` ADLANIR) — `CampaignForm`, Hissə 5-Ə BAXIN, `name` YOX, `title` SAHƏSİ VAR.
- `useCrudModal<Campaign, CampaignForm>(emptyForm, toForm)` — TİPLƏR FƏRQLİDİR, MƏNTİQ EYNİDİR.

**`Products.tsx`** — EYNİ QURULUŞ + ƏLAVƏ MÜRƏKKƏBLİK:
```tsx
const { data: categoryOptions = [] } = useQuery({
  queryKey: ['categories'],
  queryFn: () => listCategories().then((data) => data.map(mapCategoryFromApi)),
})
```
- İKİNCİ BİR `useQuery` ÇAĞIRIŞI VAR — MƏHSUL FORMASINDAKI "KATEQORİYA" DROPDOWN-U ÜÇÜN. `queryKey: ['categories']` — BU, `Categories.tsx`-İN İSTİFADƏ ETDİYİ **EYNİ AÇARDIR** — TANSTACK QUERY BUNU GÖRÜB İKİ AYRI SORĞU YERİNƏ BİR DƏFƏ ÇƏKİB PAYLAŞIR. `categoryOptions`-UN TİPİ AVTOMATİK `Category[]`-DİR — **VƏ MƏHZ EYNİ `queryFn` (`listCategories().then((data) => data.map(mapCategoryFromApi))`) İŞLƏDİLMƏLİDİR**, TypeScript BUNU MƏCBUR ETMİR, AMMA CLAUDE.md-DƏ SƏNƏDLƏŞDİRİLƏN QAYDADIR (Hissə 13-DƏ, `Categories.tsx`-İN İZAHINDA DA QEYD OLUNDU).
```tsx
<Button icon={Plus} onClick={() => openCreate({ category_id: categoryOptions[0]?.id ?? '' })}>Yeni Məhsul</Button>
```
- `openCreate` FUNKSİYASINA `{ category_id: categoryOptions[0]?.id ?? '' }` VERİLİR (`useCrudModal`-DAKI `overrides: Partial<ProductForm>` PARAMETRİ, Hissə 15-Ə BAXIN) — YENİ MƏHSUL FORMASI AÇILANDA, DROPDOWN-DA BİRİNCİ KATEQORİYA AVTOMATİK SEÇİLİ GƏLSİN DEYƏ. `categoryOptions[0]?.id ?? ''` — `categoryOptions[0]` (Hissə 3-DƏKİ `noUncheckedIndexedAccess` AYARINA GÖRƏ) `undefined` DƏ OLA BİLƏR (SİYAHI BOŞ OLA BİLƏR), ONA GÖRƏ `?.id` (OPTIONAL CHAINING) + `?? ''` (NULLİSH COALESCING) LAZIM GƏLİB.
- TİP (`Növ`) DROPDOWN-U `PRODUCT_TYPE_OPTIONS`-DAN QURULUR (Hissə 11-Ə BAXIN), `onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as ProductType }))}` — **BURADA `as ProductType` VAR** (Hissə 3-DƏKİ `as`-A BAXIN): `<select>`-in `onChange`-i HƏMİŞƏ `string` QAYTARIR, AMMA BİZ BİLİRİK Kİ, SEÇİLƏ BİLƏN DƏYƏRLƏR MƏHZ `PRODUCT_TYPE_OPTIONS`-DAKI 10 DƏYƏRDƏN BİRİDİR (ÇÜNKİ `<option>`-LAR MƏHZ O SİYAHIDAN QURULUB). BADGE RƏNGİ `productTypeBadgeColor(item.type)` FUNKSİYASI İLƏ TƏYİN OLUNUR.

### `src/pages/protected/Orders/Orders.tsx` — FƏRQLİ NÜMUNƏ, ƏN ÇOX TİP MƏNTİQİ OLAN SƏHİFƏ

BU SƏHİFƏ `ActionMenu`/`useCrudModal` İŞLƏTMİR (BİLƏRƏKDƏN, LAYİHƏNİN DİZAYN QƏRARIDIR) — SADƏ "Göstər" DÜYMƏSİ + DETAL MODALI VAR, VƏ YARATMA/SİLMƏ YOXDUR, YALNIZ **STATUS DƏYİŞDİRMƏ**.

```tsx
import type { OrderStatus } from '@/lib/constants/orderStatus'
import type { Order, OrderStats } from '@/types/order'

const emptyStats: OrderStats = { TOTAL: 0, DELIVERED: 0, PENDING: 0, PREPARING: 0, CANCELLED: 0, TOTAL_REVENUE: 0 }

// TOTAL hər zaman var, digər statuslar sifariş siyahısında rast gəlindikcə əlavə olunur —
// ona görə TOTAL adi `number`, qalanları isə "ola da bilər, olmaya da" mənasında `Partial`.
type StatusCounts = { TOTAL: number } & Partial<Record<OrderStatus, number>>

export default function Orders() {
  // ...
  const { data: orders = [], isLoading: loading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => listOrders().then((data) => data.map(mapOrderFromApi)),
  })
  const { data: statsData } = useQuery({
    queryKey: ['orderStats'],
    queryFn: getOrderStats,
  })
  // `/orders/admin/stats` doesn't reliably include every OrderStatus counter
  // (CANCELLED in particular can come back missing, see docs/API.md §8.2) —
  // `orders` is already the full unpaginated list, so count statuses from it
  // directly instead of trusting the backend summary for per-status counts.
  const statusCounts = orders.reduce<StatusCounts>(
    (acc, o) => {
      acc.TOTAL += 1
      acc[o.status] = (acc[o.status] ?? 0) + 1
      return acc
    },
    { TOTAL: 0 },
  )
  const stats: OrderStats = { ...emptyStats, ...statsData, ...statusCounts }
```
- `emptyStats: OrderStats` — Hissə 5-Ə BAXIN, BÜTÜN 6 SAHƏSİ SIFIRLA BAŞLAYAN "BOŞ" STATİSTİKA.
- **`type StatusCounts = { TOTAL: number } & Partial<Record<OrderStatus, number>>`** — Hissə 3-DƏ ARTIQ İZAH OLUNDU (`&` İNTERSECTION BÖLMƏSİNDƏ). BURADA TƏKRAR XATIRLADAQ: BU TİP, "`TOTAL` MÜTLƏQ VAR (RƏQƏMDİR), QALAN 5 STATUSUN (`PENDING`, `CONFIRMED` VƏ S.) HƏR BİRİ İSƏ OLA DA BİLƏR, OLMAYA DA" DEYİR — ÇÜNKİ `orders.reduce(...)` SİYAHINI GƏZƏRKƏN, ƏGƏR SİYAHIDA, MƏSƏLƏN, HEÇ BİR `CANCELLED` SİFARİŞ YOXDURSA, `acc.CANCELLED` HEÇ VAXT TƏYİN OLUNMAYACAQ (`undefined` QALACAQ) — TİP BUNU DÜZGÜN ƏKS ETDİRİR.
- **`orders.reduce<StatusCounts>((acc, o) => {...}, { TOTAL: 0 })`** — Hissə 2-DƏKİ `.reduce()`-A BAXIN, İNDİ **GENERİK İLƏ**: `<StatusCounts>` — "BU REDUCE-UN NƏTİCƏSİ (VƏ HƏR ADDIMDAKI `acc` DƏYƏRİ) `StatusCounts` FORMASINDA OLACAQ" DEYİR. `acc[o.status] = (acc[o.status] ?? 0) + 1` — `o.status: OrderStatus` (MƏHDUD, 6 DƏYƏRDƏN BİRİ), `acc[o.status]` İSƏ (`Partial` OLDUĞU ÜÇÜN) `number | undefined` OLA BİLƏR, ONA GÖRƏ `?? 0` İLƏ "HƏLƏ SAYILMAYIBSA, 0-DAN BAŞLA" DEYİLİR, SONRA `+ 1` İLƏ ARTIRILIR.
- `stats: OrderStats = { ...emptyStats, ...statsData, ...statusCounts }` — SPREAD-İN "SIRA İLƏ ÜSTƏLƏMƏ" XÜSUSİYYƏTİ BURADA MÜHÜM RİSKİN QARŞISINI ALIR ÜÇÜN İŞLƏDİLİR: `emptyStats` BÜTÜN AÇARLARI SIFIRLA TƏYİN EDİR, `...statsData` (BACKEND-DƏN GƏLƏN, `Partial<OrderStats>` — ÇATIŞMAYAN SAHƏLƏRİ OLA BİLƏR) MÖVCUD AÇARLARI ÜSTƏLƏYİR, SONRA **`...statusCounts` (BİZİM ÖZÜMÜZÜN HESABLADIĞI, DAHA ETİBARLI SAYĞACLAR) SON OLARAQ ÜSTƏLƏYİR** — YƏNİ, BACKEND `CANCELLED`-İ YANLIŞ/ÇATIŞMAZ QAYTARSA BELƏ, BİZİM ÖZ HESABLADIĞIMIZ DƏYƏR QALİB GƏLİR. NƏTİCƏ TİPİ (`stats: OrderStats`) TAM (PARTIAL DEYİL) OLMALIDIR — BU DA TypeScript-Ə "ARTIQ HAMISI DOLUDUR" DEDİYİMİZ YERDİR, VƏ ƏGƏR BU MERGE ADDIMI GƏLƏCƏKDƏ SƏHVƏN SİLİNSƏ, TypeScript DƏRHAL "`stats` `OrderStats`-A UYĞUN GƏLMİR (BƏZİ SAHƏLƏR `undefined` OLA BİLƏR)" DEYƏ XƏBƏRDARLIQ EDƏCƏK.

```tsx
  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: OrderStatus }) => updateOrderStatus(id, status),
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ['orders'] })
      const previousOrders = queryClient.getQueryData<Order[]>(['orders'])
      queryClient.setQueryData<Order[]>(['orders'], (old) =>
        old?.map((o) => (o.id === id ? { ...o, status } : o)),
      )
      return { previousOrders }
    },
    onError: (_err, _variables, context) => {
      if (context?.previousOrders) {
        queryClient.setQueryData(['orders'], context.previousOrders)
      }
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['orders'] }),
        queryClient.invalidateQueries({ queryKey: ['orderStats'] }),
      ])
      toast.success('Sifariş statusu yeniləndi')
    },
  })
```
Bu, **"OPTİMİSTİK YENİLƏMƏ"** (optimistic update) ADLANAN BİR PATTERNDIR — İSTİFADƏÇİ STATUSU DƏYİŞƏN KİMİ, SERVERDƏN CAVAB GƏLMƏMİŞ, EKRAN DƏRHAL YENİLƏNİR (VƏ SERVER XƏTA QAYTARSA, GERİ QAYIDIR):
- `onMutate: async ({ id, status }) => {...}` — MUTASİYA GÖNDƏRİLMƏZDƏN ƏVVƏL İŞƏ DÜŞÜR.
  - `queryClient.cancelQueries({ queryKey: ['orders'] })` — HAZIRDA DAVAM EDƏN (ƏGƏR VARSA) `['orders']` SORĞUSUNU LƏĞV EDİR (Kİ, BİZİM ETMƏK ÜZRƏ OLDUĞUMUZ "ƏL İLƏ" YENİLƏMƏNİ ÜSTƏLƏMƏSİN).
  - **`queryClient.getQueryData<Order[]>(['orders'])`** — CACHE-DƏN CARİ `['orders']` DATASINI OXUYUR. `<Order[]>` GENERİK — "BU DATANIN `Order[]` OLDUĞUNU GÖZLƏYİRƏM" DEYİR (`getQueryData`-NIN ÖZÜ, TİP VERİLMƏSƏ, `unknown` QAYTARARDI — Hissə 3-Ə BAXIN, ÇÜNKİ CACHE-İN DAXİLİNDƏ NƏ OLDUĞUNU TANSTACK QUERY-NİN ÖZÜ "BİLMİR", BİZ DEMƏLİYİK).
  - **`queryClient.setQueryData<Order[]>(['orders'], (old) => old?.map((o) => (o.id === id ? { ...o, status } : o)))`** — CACHE-DƏKİ `['orders']` SİYAHISINI, DƏYİŞDİRİLƏN SİFARİŞİN STATUSUNU YENİ DƏYƏRLƏ ƏVƏZ EDƏRƏK, DƏRHAL (SERVER CAVABI GƏLMƏMİŞ) YENİLƏYİR. `old?.map(...)` — `old` (CACHE-DƏKİ ƏVVƏLKİ DATA) NƏZƏRİ OLARAQ `undefined` OLA BİLƏR (HEÇ SORĞU GETMƏYİBSƏ), ONA GÖRƏ `?.` İLƏ TƏHLÜKƏSİZLƏŞDİRİLİB.
  - `return { previousOrders }` — BU FUNKSİYANIN QAYTARDIĞI OBYEKT, `onError`-A "CONTEXT" (KONTEKST) KİMİ ÖTÜRÜLÜR (AŞAĞIYA BAXIN) — TANSTACK QUERY-NİN ÖZ TİP SİSTEMİ, `onMutate`-İN QAYTARDIĞI FORMANI AVTOMATİK OLARAQ `onError`/`onSuccess`-İN `context` PARAMETRİNƏ "BAĞLAYIR", AYRICA GENERİK YAZMAĞA EHTİYAC QALMIR.
- `onError: (_err, _variables, context) => {...}` — MUTASİYA XƏTA VERSƏ İŞƏ DÜŞÜR. `_err`/`_variables` PARAMETRLƏRİ İSTİFADƏ OLUNMUR (ADLARININ `_` İLƏ BAŞLAMASI, "BU PARAMETRİ QƏSDƏN İŞLƏTMİRƏM" DEMƏK ÜÇÜN BİR ADƏTDİR — HEÇ BİR XÜSUSİ TypeScript QAYDASI DEYİL, SADƏCƏ OXUNAQLILIQ ÜÇÜN). `context?.previousOrders` — YUXARIDAKI `onMutate`-İN QAYTARDIĞI OBYEKT — VARSA (VƏ `onMutate` UĞURLA BAŞA ÇATIBSA), CACHE-İ ƏVVƏLKİ (DƏYİŞİKLİKDƏN ƏVVƏLKİ) HALINA GERİ QAYTARIR — YƏNİ, SERVER XƏTA QAYTARSA, EKRANDAKI "YALANDAN" YENİLƏNMİŞ STATUS GERİ, ƏSL HALINA QAYIDIR.
- `onSuccess: async () => {...}` — UĞURLU OLSA, HƏM `['orders']`, HƏM DƏ `['orderStats']`-İ YENİDƏN ÇƏKDİRİR (`Promise.all([...])` İLƏ EYNİ ANDA — Hissə 2-Ə BAXIN) VƏ UĞUR TOASTI GÖSTƏRİR.

**Bu, NİYƏ LAZIM İDİ?** Optimistik yeniləmə OLMASA, İSTİFADƏÇİ STATUSU DƏYİŞƏNDƏ, EKRAN YALNIZ SERVER CAVAB VERDİKDƏN SONRA (BİR NEÇƏ SANİYƏ ÇƏKƏ BİLƏR) YENİLƏNƏRDİ — BU MÜDDƏTDƏ DROPDOWN "GERİ QAYIDIR" KİMİ HİSS OLUNURDU (BİR REAL UX PROBLEMİ İDİ, LAYİHƏNİN ÖZÜNDƏ TAPILIB DÜZƏLDİLİB).

```tsx
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const selected = orders.find((o) => o.id === selectedId) ?? null
```
- `useState<number | null>(null)` — Hissə 3-DƏKİ GENERİK, BURADA `useState`-İN ÖZÜNDƏ: "`selectedId`, YA BİR RƏQƏM (SEÇİLƏN SİFARİŞİN ID-Sİ), YA DA `null` (HEÇ NƏ SEÇİLMƏYİB) OLA BİLƏR" DEYİR. **BURADA AÇIQ GENERİK YAZMAĞIN SƏBƏBİ:** `useState(null)` YAZSAYDIQ, TypeScript BUNU `useState<null>(null)` KİMİ "İNFER" EDƏRDİ (YƏNİ, DƏYƏR HƏMİŞƏ `null` OLMALIDIR DEYƏ DÜŞÜNƏRDİ) — SONRADAN `setSelectedId(5)` YAZSAQ XƏTA VERƏRDİ. ONA GÖRƏ, "BAŞLANĞICDA `null`, AMMA GƏLƏCƏKDƏ `number` DƏ OLA BİLƏR" DEMƏK ÜÇÜN, GENERİKİ ƏL İLƏ YAZMAQ LAZIMDIR.
- **DİQQƏTLİ DİZAYN QƏRARI**: `selected` (AÇIQ MODALDAKI SİFARİŞ) BİR "SNAPSHOT" (SEÇİLƏN ANDAKI KOPYA) KİMİ SAXLANMIR — SADƏCƏ `selectedId` (ID-Sİ) SAXLANIR, `selected`-İN ÖZÜ İSƏ HƏR RENDER-DƏ `orders` SİYAHISINDAN **YENİDƏN TAPILIR** (`.find(...)`). BUNUN FAYDASI: STATUS DƏYİŞDİRİLİB `orders` SİYAHISI YENİLƏNƏNDƏ, `selected` DƏ AVTOMATİK TƏZƏ DATanı GÖSTƏRİR.

```tsx
  const updateStatus = (id: number, status: OrderStatus) => {
    statusMutation.mutate({ id, status })
  }
```
`updateStatus(id: number, status: OrderStatus)` — TİPLƏNMİŞ PARAMETRLƏR. BURADA `mutate` İŞLƏDİLİR, `mutateAsync` YOX — ÇÜNKİ BU FUNKSİYA `await`/`try-catch` İLƏ NƏTİCƏNİ GÖZLƏMİR ("ATIB-UNUT" YANAŞMASI KİFAYƏTDİR — XƏTA/UĞUR HƏR HALDA QLOBAL OLARAQ TOAST-DA GÖRÜNƏCƏK, VƏ ARTIQ OPTİMİSTİK YENİLƏMƏ EKRANI DƏRHAL YENİLƏYİB).

**JSX-DƏ BİR ƏLAVƏ NÖQTƏ:** `<select value={selected.status} onChange={(e) => updateStatus(selected.id, e.target.value as OrderStatus)}>` — YENƏ Hissə 3-DƏKİ `as OrderStatus` (SEÇİM DROPDOWN-U, `ORDER_STATUS_OPTIONS`-DAN QURULDUĞU ÜÇÜN, HƏMİŞƏ KEÇƏRLİ BİR STATUS QAYTARIR).

### `src/pages/protected/Users/Users.tsx` — ƏN SADƏ SƏHİFƏ

BU SƏHİFƏ TAMAMİLƏ **OXUMAQ ÜÇÜNDÜR** — YARATMA, DÜZƏLTMƏ, SİLMƏ YOXDUR (BACKEND-DƏ BELƏ ENDPOİNT-LƏR DƏ YOXDUR, ONA GÖRƏ `src/types/user.ts`-DƏ DƏ `UserForm`/`UserPayload` YOXDUR). YALNIZ:
```tsx
const { data: users = [], isLoading: loading } = useQuery({
  queryKey: ['users'],
  queryFn: () => listUsers().then((data) => data.map(mapUserFromApi)),
})
const [selected, setSelected] = useState<User | null>(null)
```
BİR `useQuery`, BİR "Göstər" DÜYMƏSİ/DETAL MODALI ÜÇÜN `selected: User | null` STATE-İ (BURADA `Orders.tsx`-DƏKİ KİMİ ID-YƏ DAYALI DEYİL, TAM BİR `User` OBYEKTİ SAXLANIR — ÇÜNKİ BU SİYAHI HEÇ VAXT MUTASİYA OLUNMUR, DƏYİŞMƏYƏCƏK BİR SİYAHIDA "SNAPSHOT" SAXLAMAQ TAM TƏHLÜKƏSİZDİR). QALAN HƏR ŞEY — `usePagination<User>`, AXTARIŞ FİLTRİ, CƏDVƏL — EYNİ NÜMUNƏLƏRİ TƏKRARLAYIR.

---

## Hissə 19: CSS Modules

HƏR KOMPONENTİN YANINDA (`Button.tsx` YANINDA `Button.module.css` KİMİ) BİR CSS FAYLI VAR. MİSAL:

```css
/* Button.module.css */
.btn {
  padding: 10px 16px;
  border-radius: 8px;
}
.solid {
  background: var(--color-green);
}
```

```tsx
import styles from './Button.module.css'
<button className={styles.btn}>...</button>
```

**Nə baş verir?** VITE, `.module.css` ADLI FAYLLARI GÖRƏNDƏ, HƏR KLAS ADINI (`.btn`, `.solid`) **UNİKAL BİR ADA** ÇEVİRİR (MƏSƏLƏN `Button-module__btn__x7K2m`) VƏ BUNLARI `styles` ADLI BİR JAVASCRIPT OBYEKTİ KİMİ İXRAC EDİR. BELƏLİKLƏ, BAŞQA BİR FAYLDA DA `.btn` KLASI YAZSANIZ, İKİSİ TOQQUŞMUR.

**TypeScript, `import styles from './Button.module.css'`-Ə NECƏ İCAZƏ VERİR?** ADƏTƏN, TypeScript YALNIZ `.ts`/`.tsx` FAYLLARINI "TANIYIR" — BİR `.css` FAYLINI "İDXAL ETMƏK" ONUN ÜÇÜN QƏRİBƏDİR (TypeScript-in ÖZÜ CSS-İ ANLAMIR). Bu SƏBƏBDƏN, `src/vite-env.d.ts` FAYLINDA (Hissə 20-YƏ BAXIN) BELƏ BİR "AMBIENT" (ORTAQ, HEÇ BİR KONKRET FAYLA AİD OLMAYAN) DEKLARASİYA VAR:
```ts
declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}
```
`declare module '*.module.css'` — Hissə 3-DƏKİ `declare module`-A BAXIN, AMMA BURADA `'axios'` KİMİ KONKRET BİR PAKET YOX, `'*.module.css'` (ULDUZ İŞARƏSİ İLƏ, "BU NÜMUNƏYƏ UYĞUN GƏLƏN İSTƏNİLƏN FAYL") YAZILIB — "`.module.css` İLƏ BİTƏN İSTƏNİLƏN FAYLI İDXAL EDƏNDƏ, NƏTİCƏ BELƏ BİR OBYEKT OLACAQ" DEYİR: `{ readonly [key: string]: string }` — "AÇARLARI İSTƏNİLƏN STRİNG (`btn`, `solid` VƏ S.), DƏYƏRLƏRİ İSƏ HƏMİŞƏ STRİNG (UNİKAL KLAS ADI) OLAN BİR OBYEKT, VƏ BU OBYEKT DƏYİŞDİRİLƏ BİLMƏZ (`readonly`)". Bu, **BİR DƏFƏ, QLOBAL** YAZILIB — HƏR KOMPONENT ÜÇÜN AYRICA `.d.ts` FAYLI YAZMAĞA EHTİYAC YOXDUR.

**`var(--color-green)` NƏDİR?** — `src/index.css`-DƏ TƏYİN OLUNAN CSS DƏYİŞƏNLƏRİDİR (CSS CUSTOM PROPERTIES):
```css
:root {
  --color-green: #7cc576;
  --radius-sm: 8px;
}
```
`var(--color-green)` — BU DƏYİŞƏNİN DƏYƏRİNİ (`#7cc576`) OXUYUR. BÜTÜN RƏNGLƏR/ÖLÇÜLƏR BURADA BİR DƏFƏ TƏYİN OLUNUB, HƏR YERDƏ TƏKRAR YAZMAQ ƏVƏZİNƏ `var(--...)` İLƏ İSTİFADƏ OLUNUR.

**Cədvəllərin "içəridə scroll" davranışı (bu, TypeScript-ə aid deyil, sırf CSS-dir, amma tez-tez sual doğurur):** `shared/components/Table/Table.module.css`-də `.scroll` KLASI `flex: 1` VƏ `overflow: auto`-DUR, `<thead>` İSƏ `position: sticky; top: 0`-DIR. BUNUN NƏTİCƏSİ: SƏHİFƏ ÖZÜ (VƏ ONUNLA BİRLİKDƏ SIDEBAR-IN HÜNDÜRLÜYÜ) HƏMİŞƏ SABİT QALIR (`AdminLayout.module.css`-DƏKİ `--shell-content-height`), ARTIQ SƏTİR OLANDA (MƏS. PAGINATION-DA "10/page" SEÇİLƏNDƏ) CƏDVƏLİN ÖZÜ (SƏHİFƏ YOX) DAXİLDƏ SÜRÜŞDÜRÜLÜR, VƏ SCROLLBAR (SÜRÜŞDÜRMƏ ZOLAĞI) `scrollbar-width: none`/`::-webkit-scrollbar{display:none}` İLƏ GİZLƏDİLİB (SCROLL FUNKSİONAL QALIR, SADƏCƏ VİZUAL ZOLAQ GÖRÜNMÜR). Bu, LAYİHƏDƏ TAPILAN BİR REAL BUG-IN (SƏTIR SAYI ARTANDA SOL TƏRƏFDƏKİ "ÇIXIŞ" DÜYMƏSİNİN YERDƏN-YERƏ SIÇRAMASI) HƏLLİDİR.

---

## Hissə 20: Tooling

Bu bölmə, LAYİHƏNİN "ARXA PLANDA" İŞLƏYƏN, HEÇ BİR JSX/KOMPONENT OLMAYAN, AMMA BÜTÜN TypeScript/lint SİSTEMİNİ İDARƏ EDƏN KONFİQURASİYA FAYLLARINI İZAH EDİR.

### `tsconfig.json`

Bu, TypeScript-in ÖZ AYARLARININ olduğu fayldır. LAYİHƏDƏKİ HƏR `.ts`/`.tsx` FAYL BU AYARLARA GÖRƏ YOXLANILIR:

```jsonc
{
  "compilerOptions": {
    "target": "ES2022",
    "jsx": "react-jsx",
    "allowJs": false,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src"]
}
```
- `"target": "ES2022"` — TypeScript-in KODU HANSI JavaScript "NƏSLİNƏ" ÇEVİRƏCƏYİNİ BİLDİRİR (KÖHNƏ BRAUZERLƏR ÜÇÜN DAHA ƏSKİ BİR NƏSİL SEÇİLƏ BİLƏRDİ, BU LAYİHƏDƏ MÜASİR BRAUZERLƏR HƏDƏFLƏNDİYİ ÜÇÜN YENİ NƏSİL SEÇİLİB).
- `"jsx": "react-jsx"` — `.tsx` FAYLLARDAKI JSX-İN NECƏ "TƏRCÜMƏ" OLUNACAĞINI BİLDİRİR (React 17+-IN YENİ, `import React` YAZMAĞA EHTİYAC OLMAYAN ÜSULU).
- `"allowJs": false` — **BÜTÜN LAYİHƏ TAM TypeScript-DƏ OLDUĞU ÜÇÜN**, ARTIQ `.js`/`.jsx` FAYLLARINA İCAZƏ VERİLMİR (MİQRASİYA VAXTI, KEÇİD DÖVRÜNDƏ, BU `true` İDİ — HƏM `.js`, HƏM `.ts` FAYLLAR EYNİ ANDA MÖVCUD OLA BİLSİN DEYƏ; İNDİ SON `.jsx` FAYL DA `.tsx`-Ə ÇEVRİLDİKDƏN SONRA `false`-A DƏYİŞDİRİLİB).
- **`"strict": true`** — ƏN VACİB AYARDIR: BİR NEÇƏ AYRI SIXI YOXLAMANI (MƏS. "HEÇ BİR DƏYİŞƏN İMPLİSİT `any` OLA BİLMƏZ", "`null`/`undefined` YOXLANMADAN İSTİFADƏ OLUNA BİLMƏZ" VƏ S.) BİR YERDƏ AKTİV EDİR. BUNSUZ, TypeScript ÇOX DAHA "YUMŞAQ" OLARDI, BƏZİ SƏHVLƏRİ BURAXARDI.
- `"noUncheckedIndexedAccess": true` — Hissə 3-DƏ ƏTRAFLI İZAH OLUNDU.
- `"noImplicitOverride": true` — Hissə 3-DƏ ƏTRAFLI İZAH OLUNDU (`ErrorBoundary`-DƏKİ `override` SÖZLƏRİNİ MƏCBUR EDİR).
- `"paths": { "@/*": ["./src/*"] }` — Hissə 2-DƏ İZAH OLUNAN `@/` QISAYOLUNUN TypeScript ÜÇÜN TƏYİNATI (Vite-in ÖZ `vite.config.js`-İNDƏ DƏ EYNİ QISAYOL AYRICA TƏYİN OLUNUB — İKİSİ SİNXRON SAXLANILMALIDIR).

### `.oxlintrc.json`

```jsonc
{
  "plugins": ["react", "oxc", "typescript"],
  "rules": {
    "react/rules-of-hooks": "error",
    "typescript/no-explicit-any": "error",
    "typescript/consistent-type-imports": "warn"
  }
}
```
`oxlint` — Hissə 1-DƏ QEYD OLUNDU, "LİNTER"DİR (ESLint-in SÜRƏTLİ ALTERNATİVİ). `npm run lint` ƏMRİ BUNU İŞƏ SALIR. `"typescript"` PLUGİNİ (`plugins` SİYAHISINDA) SAYƏSİNDƏ, `.ts`/`.tsx` FAYLLARDA XÜSUSİ QAYDALAR AKTİV OLUR: `typescript/no-explicit-any: "error"` — Hissə 3-DƏ İZAH OLUNAN `any` QADAĞASININ MƏHZ BURADA "MƏCBURİLƏŞDİRİLDİYİ" YERDİR (BİRİSİ `any` YAZSA, `npm run lint` ƏMRİ QIRMIZI XƏTA VERƏR). `typescript/consistent-type-imports: "warn"` — `import type`-IN İSTİFADƏSİNİ TÖVSİYƏ EDİR (XƏBƏRDARLIQ SƏVİYYƏSİNDƏ, ÇÜNKİ `tsconfig.json`-DAKI `verbatimModuleSyntax` ARTIQ BUNU TAM MƏCBURİ EDİR — BU QAYDA SADƏCƏ REDAKTORDA DAHA TEZ XƏBƏRDARLIQ VERMƏK ÜÇÜNDÜR).

### `src/vite-env.d.ts`

```ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}
```
- `/// <reference types="vite/client" />` — XÜSUSİ BİR ŞƏRH SƏTRİDİR (ÜÇ SLASH İLƏ BAŞLAYIR), TypeScript-Ə "Vite-İN ÖZÜNÜN TİPLƏRİNİ DƏ BURAYA DAXİL ET" DEYİR (MƏS. `import.meta.hot` KİMİ Vite-Ə XAS ŞEYLƏR ÜÇÜN).
- `interface ImportMetaEnv { readonly VITE_API_BASE_URL: string }` — Hissə 9-DA GÖRDÜYÜMÜZ `import.meta.env.VITE_API_BASE_URL`-İN TİPİNİ TƏYİN EDİR: "`.env` FAYLINDAKI DƏYİŞƏNLƏR ARASINDA, `VITE_API_BASE_URL` ADLI BİR STRİNG VAR (VƏ DƏYİŞDİRİLƏ BİLMƏZ, `readonly`)". BUNSUZ, `import.meta.env.VITE_API_BASE_URL` YAZANDA TypeScript "BELƏ BİR SAHƏ YOXDUR" DEYƏ XƏTA VERƏRDİ.
- `interface ImportMeta { readonly env: ImportMetaEnv }` — `import.meta`-NIN ÖZÜNÜN, `env` ADLI BİR SAHƏYƏ MALİK OLDUĞUNU (VƏ O SAHƏNİN YUXARIDAKI `ImportMetaEnv` FORMASINDA OLDUĞUNU) TƏYİN EDİR.
- `declare module '*.module.css' { ... }` — Hissə 19-DA İZAH OLUNDU.

**`vite-env.d.ts`-in ADINDAKI `.d.ts` NƏ DEMƏKDİR?** `.d.ts` — "DECLARATION FİLE" (DEKLARASİYA FAYLI) DEMƏKDİR: BU FAYLLARDA HEÇ BİR "İCRA OLUNAN" KOD YOXDUR (FUNKSİYA ÇAĞIRILMIR, KOMPONENT RENDER OLUNMUR) — YALNIZ TİP DEKLARASİYALARI VAR. Bu FAYLLAR HEÇ VAXT BROWSER-Ə "GÖNDƏRİLMİR" (BUILD NƏTİCƏSİNDƏ TAMAMİLƏ SİLİNİR), YALNIZ TypeScript-in ÖZÜ ÜÇÜN, KODU YAZARKƏN, "ARXA PLANDA" MÖVCUDDUR.

---

## Hissə 21: Lüğət

| Termin | Mənası |
|---|---|
| **Komponent** | UI-nin bir hissəsini qaytaran funksiya (böyük hərflə başlayır) |
| **Prop** | Komponentə kənardan verilən "parametr" |
| **State** | Komponentin öz "yaddaşı" (`useState`) — dəyişəndə ekran yenilənir |
| **Hook** | `use`-la başlayan funksiya (`useState`, `useEffect`, öz hook-larımız) |
| **JSX** | HTML-ə bənzəyən, JavaScript-ə çevrilən sintaksis |
| **Render** | Komponentin JSX-ini hesablayıb ekrana çıxarmaq prosesi |
| **Route** | Bir URL-ə uyğun gələn səhifə təyinatı |
| **Endpoint** | Backend-in bir konkret ünvanı (məs. `/admin/categories`) |
| **Payload** | Serverə göndərilən data (body) |
| **Adapter** | API formatını UI formatına (və əksinə) çevirən funksiya |
| **Query** | TanStack Query-də data OXUMA əməliyyatı (`useQuery`) |
| **Mutation** | TanStack Query-də data YAZMA əməliyyatı (`useMutation`) |
| **Cache** | Yaddaşda saxlanan, təkrar sorğuya ehtiyacı azaldan data |
| **Invalidate** | Cache-dəki datanı "köhnəlmiş" elan edib yenidən çəkdirmək |
| **Optimistic update** | Server cavabını gözləmədən, ekranı DƏRHAL yeniləmək (xəta olsa geri qaytarılır) |
| **Interceptor** | Hər sorğu/cavabı "ələ keçirib" ortaq məntiq tətbiq edən axios funksiyası |
| **Toast** | Ekranın küncündə görünən, öz-özünə yox olan bildiriş qutucuğu |
| **Debounce** | İstifadəçi fəaliyyəti dayandırdıqdan sonra müəyyən gecikmə ilə davranmaq |
| **Destructuring** | Obyekt/massivdən sahələri ayrıca dəyişənlərə "çıxarmaq" |
| **Spread (`...`)** | Obyekt/massivi "açıb" başqasının içinə tökmək |
| **Rest (`...`)** | Qalan bütün prop/elementləri bir yerə yığmaq |
| **Optional chaining (`?.`)** | "Əgər varsa daxil ol", yoxdursa xəta vermədən `undefined` qaytar |
| **Nullish coalescing (`??`)** | Sol tərəf `null`/`undefined`-dursa sağ tərəfi istifadə et |
| **Ternar operator (`? :`)** | Qısa if/else: `şərt ? doğrudursa : yanlışdırsa` |
| **Async/await** | Asinxron (gecikən) işi "gözləyərək" ardıcıl kodmuş kimi yazmaq üsulu |
| **Promise** | "Gələcəkdə bitəcək iş" təmsil edən JavaScript obyekti |
| **localStorage** | Brauzerin, səhifə bağlansa belə itməyən yaddaşı |
| **CSS Modules** | Hər faylın klas adlarını avtomatik unikal edən CSS sistemi |
| **Controlled input** | Dəyəri tam React state-dən idarə olunan `<input>` |
| **Custom hook** | Öz yazdığımız, `use`-la başlayan, təkrarlanan məntiqi yığan funksiya |
| **Portal** | Bir elementi, React ağacındakı yerindən asılı olmayaraq, DOM-da başqa yerə "işınlamaq" (`createPortal`) |
| **Error Boundary** | Uşaqlarındakı JS xətalarını tutub, bütün tətbiqin çökməsinin qarşısını alan class komponent |
| **Lazy loading** | Bir komponentin kodunu YALNIZ lazım olanda yükləmək (`React.lazy`) |
| **Suspense** | `lazy` komponent yüklənənə qədər nə göstəriləcəyini idarə edən React komponenti |
| **Chunk** | Build zamanı ayrılan kiçik JS fayl parçası |
| **TypeScript** | JavaScript-in üzərinə "tip yoxlaması" əlavə edən dil |
| **Tip (type)** | Bir dəyərin hansı NÖVDƏN (string, number, obyekt formalı və s.) olduğunu bildirən təsvir |
| **`interface`/`type`** | Bir obyektin (və ya digər dəyərin) formasını təyin edən TypeScript sintaksisi |
| **Union (`\|`)** | "Bu, ya bu tip, ya da o tip ola bilər" |
| **Intersection (`&`)** | "Bu, HƏM bu tipin, HƏM DƏ o tipin bütün sahələrinə malikdir" |
| **Generic (`<T>`)** | Bir funksiya/tipin, "hansı tiplə işlədiyindən asılı olmayaraq" eyni cür işləməsi |
| **`unknown`** | "Tipini bilmirəm, amma istifadədən əvvəl MÜTLƏQ yoxlanmalıdır" |
| **`any`** | "İstənilən tip ola bilər, TypeScript heç yoxlamasın" — bu layihədə QADAĞANDIR |
| **`as` (type assertion)** | "Buna etibar et, bu tipdəndir" — runtime yoxlama etmir, yalnız compile vaxtı susdurur |
| **`satisfies`** | `as`-a bənzəyir, amma HƏQİQİ yoxlama aparır, dəyərin öz tipini dəyişmir |
| **Narrowing (daraltma)** | Bir yoxlama (`instanceof`, `typeof`) ilə geniş bir tipi daha dəqiq bir tipə "daraltmaq" |
| **`Record<K, V>`** | Açarları K, dəyərləri V tipindən olan obyekt tipi |
| **`Partial<X>`** | X-in eyni sahələri, amma hamısı opsional (`?`) |
| **`Pick<X, ...>`** | X-dən yalnız qeyd olunan sahələri seçən tip |
| **`keyof typeof`** | Bir obyektin açarlarından avtomatik union tip yaratmaq |
| **`as const`** | Bir dəyəri "sabit, dəyişməz" elan etmək — `keyof typeof` trikinin işləməsi üçün lazımdır |
| **Module augmentation (`declare module`)** | Kənar bir kitabxananın öz tiplərinə, kənardan, əlavə sahə "əlavə etmək" |
| **Tip inference** | TypeScript-in, açıq yazılmasa belə, tipi özü "tapması" |
| **`tsc` / `typecheck`** | TypeScript-in kodu tam yoxlayan əmri (`npm run typecheck`) |

---

**Son qeyd:** Bu sənəd, kodun HAZIRKI (TypeScript-ə keçdikdən sonrakı) vəziyyətini əks etdirir. Kod dəyişdikcə (yeni səhifə, yeni funksiya, yeni tip əlavə olunduqca) bu sənədin də yenilənməsi lazımdır ki, köhnəlməsin. Xüsusilə: `src/types/`-ə yeni bir resurs faylı əlavə edərkən, Hissə 5-ə də həmin nümunəni (4 tip: `XApi`/`X`/`XForm`/`XPayload`) əlavə edin.
