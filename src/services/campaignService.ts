import api from './axiosInstance'

export const listCampaigns = () => api.get('/admin/campaigns')
export const createCampaign = (payload) => api.post('/admin/campaign', payload)
export const updateCampaign = (id, payload) => api.put(`/admin/campaigns/${id}`, payload)
export const deleteCampaign = (id) => api.delete(`/admin/campaigns/${id}`)
