import useApi from './useApi';

export default ({ resource, axios }) => {
  const { get, post, del: delet, put, isPending, error, data } = useApi(axios)

  const index = (options = {}) => get(resource, options)
  const show = ({ id, ...rest }) => get(`${resource}/${id}`, rest)
  const create = options => post(resource, options)
  const update = ({ id, ...rest }) => put(`${resource}/${id}`, rest)
  const del = ({ id, ...rest }) => delet(`${resource}/${id}`, rest)

  return {
    isPending,
    error,
    data,
    index,
    show,
    create,
    update,
    del,
  }
}
