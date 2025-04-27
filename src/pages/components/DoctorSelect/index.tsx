import { Select, SelectProps, Avatar } from "antd"
import { useCallback, useEffect, useState, useRef } from "react"
import "./index.scss"
interface DoctorPropsTypes extends SelectProps {
  sectorId?: string // 医生所属科室ID
}

const doctors = [
  { id: 1, label: "张三", avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=1" },
  { id: 2, label: "李四", avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=2" },
  { id: 3, label: "二狗", avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=3" },
  { id: 4, label: "狗蛋", avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" },
  { id: 5, label: "大王", avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=1" },
  { id: 6, label: "吴老二", avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=2" },
]
function DoctorSelectInput(props: DoctorPropsTypes) {
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState([])
  const { sectorId, ...restProps } = props
  const fetchDoctorsBySectorId = (sectorId?: string) => { // 数据请求模拟
    // 没有sectorId 请求全部医生
    return new Promise<typeof doctors>((res, rej) => {
      setTimeout(() => {
        res(doctors)
      }, 1000)
    })
  }
  // const 
  useEffect(() => {
    // Todo 科室的重新选择要清除这里的医生选择
    setLoading(true)
    fetchDoctorsBySectorId().then((value) => {
      const result = value.map(item => ({ label: item.label, value: item.id, avatar: item.avatar }))
      setOptions(result as any)
      setLoading(false)
    })
  }, [sectorId])

  return (
    <Select
      {...restProps}
      loading={loading}
      options={options}
      optionRender={(item, v2) => {
        const { data } = item
        return <div className="doctor-select-option-wrapper">
            <Avatar src={data.avatar}/>
            <div>{data.label}</div>
          </div>
      }}
    ></Select>
  )
}

export {
  DoctorPropsTypes,
  DoctorSelectInput as default,
}