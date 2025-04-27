import { useCallback, useEffect, useState } from "react"
import { Select, SelectProps } from "antd"

interface SectorSelect extends SelectProps {

}
const sectors = [
  { id: 1, label: "内科" },
  { id: 2, label: "外科" },
  { id: 3, label: "骨科" },
  { id: 4, label: "胸外科" },
  { id: 5, label: "耳鼻喉科" },
  { id: 6, label: "神经科" },
]

export default function SectorSelect(props: SectorSelect) {
  const { ...restProps } = props
  const [options, setOptions] = useState<typeof sectors>([])
  const [loading, setLoading] = useState(false)
  const fetchSectors = useCallback(() => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(sectors.map(item => ({ label: item.label, value: item.id })))
      }, 1000)
    })
  }, [])
  useEffect(() => {
    setLoading(true)
    fetchSectors().then(res => {
      setOptions(res as any)
      setLoading(false)
    })
  }, [])
  return <Select
    {...restProps}
    loading={loading}
    options={options}
  >
  </Select>
}