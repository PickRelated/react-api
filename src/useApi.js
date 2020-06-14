export default axios => {
  if (!axios) throw new Error('No Axios instance provided for useApi')

  const [isPending, setIsPending] = useState(false)
  const [data, setData] = useState()
  const [error, setError] = useState()

  const process = ({ method = 'get', url, body = {} }) => {
    setError(null)
    setIsPending(true)

    const {
      onStart = () => {},
      ...rest
    } = body

    onStart({ method, url, body })
    if (method === 'get') {
      axios.get(url, { ...rest }).then(res => processResult({ res, method, url, body })).catch(err => processError({ err, method, url, body }))
    } else {
      axios[method](url, rest).then(res => processResult({ res, method, url, body })).catch(err => processError({ err, method, url, body }))
    }
  }

  const processError = ({ err, method, url, body }) => {
    const {
      onError = console.error,
    } = body

      const content = (err.response && err.response.data && err.response.data.errors) ||
        (err.response && !err.response.status && ['Network error']) ||
        ['Server error']

      setIsPending(false)
      setError(content)

      onError(content, err)
  }

  const processResult = ({ res, method, url, body }) => {
    const {
      onSuccess = () => {},
      processData = data => data,
    } = body

    setIsPending(false)

    let data
    try {
      data = processData(res.data)
    } catch (err) {
      console.error(`Error in ${method.toUpperCase()} /${url} processData callback`, err)
    }

    setData(data)
    onSuccess(data)
  }

  const get = (url, body) => process({ method: 'get', url, body })
  const post = (url, body) => process({ method: 'post', url, body })
  const put = (url, body) => process({ method: 'put', url, body })
  const del = (url, body) => process({ method: 'delete', url, body })

  return { get, post, del, put, isPending, error, data }
}
