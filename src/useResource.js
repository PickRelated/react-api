import useResourceWrapper from './useResourceWrapper'

export default ({
  axios,

  resource = '',

  defaultItemValue = {},
  fetchItemOnMount = null,
  fetchItemUseEffect = [],
  fetchItemOnCreate = false,
  fetchItemOnUpdate = false,
  fetchItemOnDelete = false,
  updateItemOnCreate = false,
  updateItemOnUpdate = false,
  updateItemOnDelete = false,

  defaultListValue = [],
  fetchListOnMount = false,
  fetchListUseEffect = [],
  fetchListOnCreate = false,
  fetchListOnUpdate = false,
  fetchListOnDelete = false,
  updateListOnCreate = false,
  updateListOnUpdate = false,
  updateListOnDelete = false,
}) => {
  if (resource && !resource.length) {
    throw new Error('useResource "resource" parameter is empty')
  }

  const { data: indexResult, index } = useResourceWrapper({ resource, axios })
  const { data: showResult, show } = useResourceWrapper({ resource, axios })
  const { data: createResult, create } = useResourceWrapper({ resource, axios })
  const { data: updateResult, update } = useResourceWrapper({ resource, axios })
  const { data: deleteResult, del } = useResourceWrapper({ resource, axios })

  const [list, setList] = useState(defaultListValue)
  const [item, setItem] = useState(defaultItemValue)

  useEffect(() => { indexResult && setList(indexResult) }, [indexResult])
  useEffect(() => { showResult && setItem(showResult) }, [showResult])

  // Auto fetch
  useEffect(() => { fetchListOnMount && index() }, [])
  useEffect(() => { fetchListUseEffect && index() }, fetchListUseEffect)
  useEffect(() => { fetchListOnCreate && index() }, [createResult])
  useEffect(() => { fetchListOnUpdate && index() }, [updateResult])
  useEffect(() => { fetchListOnDelete && index() }, [deleteResult])
  useEffect(() => { fetchItemOnMount && show({ id: fetchItemOnMount }) }, [])
  useEffect(() => { fetchItemOnMount && fetchItemUseEffect && show({ id: fetchItemOnMount }) }, fetchItemUseEffect)
  useEffect(() => { fetchItemOnMount && fetchItemOnCreate && show({ id: fetchItemOnMount }) }, [createResult])
  useEffect(() => { fetchItemOnMount && fetchItemOnUpdate && show({ id: fetchItemOnMount }) }, [updateResult])
  useEffect(() => { fetchItemOnMount && fetchItemOnDelete && show({ id: fetchItemOnMount }) }, [deleteResult])

  // Auto update

  return {
    item: item || defaultItemValue,
    list: list || defaultListValue,

    createResult,
    deleteResult,

    index,
    show,
    create,
    update,
    del,
  }
}
