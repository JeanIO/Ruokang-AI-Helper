import { useState, useCallback, ChangeEventHandler, useEffect } from "react"
import { Button, Input, Table } from "antd"
import { SearchOutlined, DownOutlined} from "@ant-design/icons"
import DetailFilterDrawer from "./components/DetailFilterDrawer"
import DiagnoseDrawer from "./components/DiagnoseDrawer"
import "./index.scss"


const columns = [
  {
    title: '就诊记录',
    dataIndex: 'casenum',
    key: 'casenum',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: "年龄",
    dataIndex: 'age',
    key: "age"
  }, {
    title: "科室",
    dataIndex: 'sector',
    key: "sector"
  }
];

const remoteDataSource = [
  {
    key: 1,
    casenum: 12333123,
    name: '胡彦斌',
    age: 32,
    sector: '耳鼻喉科',
  },
  {
    key: 2,
    casenum: 12333123,
    name: '胡彦斌',
    age: 32,
    sector: '耳鼻喉科',
  }, {
    key: 3,
    casenum: 3355522,
    name: '李林',
    age: 27,
    sector: '牙科',
  }, {
    key: 4,
    casenum: 545311,
    name: '琳琳',
    age: 12,
    sector: '脑科',
  }, {
    key: 5,
    casenum: 444565412,
    name: '王二狗',
    age: 32,
    sector: '骨科',
  },
]



export default function HomePage() {
  const [searchText, setSearchText] = useState("")
  const [showDrawer, toggleDrawer] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState<any[]>([])
  const [caseId, setCaseId] = useState("")
  const [showDiagnoseDrawer, toggleDiagnoseDrawer] = useState(false)
  const fetchDataSource = useCallback(() => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(remoteDataSource)
      }, 1500)
    })
  }, [])
  useEffect(() => {
    setLoading(true)
    fetchDataSource().then(res => {
      setDataSource(res as any)
      setLoading(false)
    })
  }, [])
  const onToggleDrawer = useCallback((value?: boolean) => {
    toggleDrawer(value ?? !showDrawer)
  }, [showDrawer])

  const onAccurateSearch = useCallback((searchKey: any) => {
    console.log("您要搜索", searchKey)
    setLoading(true)
    fetchDataSource().then((res) => {
      setDataSource(res as any)
      setLoading(false)
    })
  }, [])
  const handleClickItem = useCallback((info) => {
    // console.log("info", info)
    const { casenum } = info
    const caseStr = casenum.toString()
    setCaseId(caseStr)
    toggleDiagnoseDrawer(caseStr)

    // setCaseId()
  }, [])

  const onDimSearch = useCallback(() => {
    setLoading(true)
    fetchDataSource().then(() => {
      setLoading(false)
    })
  }, [searchText])
  return (
    <div>
      <DetailFilterDrawer onSearch={onAccurateSearch} onClose={() => onToggleDrawer(false)} placement="top" open={showDrawer}/>
      <h2>若康AI助手</h2>
      <div className='search-bar-wrapper'>
        <Button type='dashed' onClick={() => onToggleDrawer()}>精细筛选<DownOutlined /></Button>
        <Input className="search-bar" prefix={<SearchOutlined />} onChange={(e) => setSearchText(e.target.value)} value={searchText} />
        <Button onClick={onDimSearch} type='primary'>查询</Button>
      </div>
      <Table
        dataSource={dataSource} 
        columns={columns}
        loading={isLoading}
        onRow={(record) => ({
          onClick: () => handleClickItem(record)
        })}
      >
      </Table>
      <DiagnoseDrawer
        open={showDiagnoseDrawer}
        caseId={caseId}
        onClose={() => toggleDiagnoseDrawer(false)}
        placement="bottom" />
    </div>
  );
}
