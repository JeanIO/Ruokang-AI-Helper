import { Col, Drawer, Form, Row, Input, DrawerProps, DatePicker, Button } from "antd"
import { useCallback, useState } from "react"
import DoctorSelect from "../DoctorSelect"
import SectorSelect from "../SectorSelect"
import "./index.scss"


interface DetailFilterDrawer extends DrawerProps {
  open: true | false
  onClose?: () => void
  onSearch?: (value: { name: string, casenum?: string, sectorId?: number, doctorId?: any, startTime?: any, endTime?: any }) => void
}
export default function DetailFilterPopOver(props: DetailFilterDrawer) {
  const { onClose, onSearch, ...restProps } = props
  const handleClose = useCallback(() => {
    onClose && onClose()
  }, [onClose])

  const [sectorId, setSectorId] = useState()
  const [form] = Form.useForm();

  const onFieldsChange = (value: any) => {
    console.log("value", value)
    const changeValue = value[0]
    if(changeValue.name[0] === "sectorId") {
      setSectorId(changeValue.value)
    }
    // setSectorId()
  }

  const onSubmit = useCallback(() => {
    onSearch && onSearch(form.getFieldValue)
    onClose && onClose()
  }, [form, onSearch])

  const onResetFields = useCallback(() => {
    form.resetFields(["name", "casenum", "sectorId", "doctorId", "startTime", "endTime"])
    onSearch && onSearch({
      name: "",
      casenum: undefined,
      sectorId: undefined,
      doctorId: undefined,
      startTime: undefined,
      endTime: undefined
    })
  }, [form, onSearch])
  
  return (
    <Drawer onClose={handleClose} {...restProps} title="精细筛选">
      <Form className="form-wrapper" form={form} onFieldsChange={onFieldsChange}>
        <Row>{/* 患者姓名和病历号 */}
          <Col span={12}>
            <Form.Item
              name="name"
            >
              <Input placeholder="输入患者姓名" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="casenum">
              <Input placeholder="输入病历号" />
            </Form.Item>
          </Col>
        </Row>
        <Row>{/* 科室和医生 */}
          <Col span={12}>
            <Form.Item
              name="sectorId"
            >
              <SectorSelect placeholder="请选择科室" className="doctor-select" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="doctorId">
              <DoctorSelect className="doctor-select" placeholder="请选择医生" sectorId={sectorId} />
            </Form.Item>
          </Col>
        </Row>
        <Row>{/* 日期范围选择 */}
          <Col span={12}>
            <Form.Item name="startTime">
              <DatePicker placement="bottomLeft" style={{width: "100%"}} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="endTime">
              <DatePicker placement="bottomRight"  style={{width: "100%"}} />
            </Form.Item>
          </Col>
        </Row>
        <div className="footer-operation-group">
          <Button type="default" onClick={onResetFields}>重置</Button>
          <Button type="primary" onClick={onSubmit}>精确搜索</Button>
        </div>
      </Form>
    </Drawer>
  )
}