import { useCallback, useEffect, useState } from "react"
import { Drawer, DrawerProps, Skeleton, Avatar, Button, message } from "antd"
import { LinkOutlined, AudioOutlined, DeleteOutlined, SendOutlined } from "@ant-design/icons"
import dayjs from "dayjs"
import './index.scss'
interface DiagnoseDrawer extends DrawerProps {
  caseId: string
}

const remoteData = {
  name: "王二狗",
  time: dayjs().format("YYYY/MM/DD HH:mm"),
  avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
  detail: "根据病历“患者性别女、年龄47，主诉:咳嗽、咳痰伴低热1周。、现病史:患者自述1周前开始出现咳嗽，咳少量白色黏痰，伴有低热(体温37.5C左右)，无寒战、胸痛、呼吸困难。自行服用感冒药(如复方氨酚烷胺片)后症状未见明显缓解。近2天咳嗽加重，夜间明显，影响睡眠。无咯血、盗汗、体重减轻等症状。今日来诊，要求进一步诊治。、既往史:无高血压、糖尿病等系统性疾病史。无药物过敏史。无吸烟、饮酒史。无结核病史及接触史。、体格检查:体温:37.6℃，脉搏:82次/分，呼吸:20次/分，血压:115/75 mmHg。神志清楚，营养状况良好。、辅助检查:、诊断:支原体感染、皮试:、处置:、治疗意见:多饮水，保持室内空气流通。避免劳累，注意休息。”，开门诊处方，包括西药或中成药。",
  comments: [
    {
      avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=3",
      name: "李医生",
      time: dayjs().format("YYYY/MM/DD HH:mm"),
      content: "小葵花妈妈课堂开课啦， 孩子发烧老不好，多半是废了。基本GG，直接送去火葬场就可以了"
    }
  ]
}

export default function DiagnoseDrawer (props: DiagnoseDrawer) {
  const { caseId, ...restProps } = props 
  const [caseInfo, setCaseInfo] = useState<any>(null)
  const [isLoading, setLoading] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [sendingComment, setSendingComment] = useState(false)
  const fetchInfo = useCallback((caseId: string) => {
    return new Promise((res) => {
      setTimeout(() => {
        res(remoteData)
      }, 2000)
    })
  }, [])
  useEffect(() => {
    setLoading(true)
    fetchInfo(caseId).then((data) => {
      setCaseInfo(data)
      setLoading(false)
    })
  }, [caseId])
  const onComment = useCallback(() => {
    if(!commentText) {
      message.warning("不能发送空文字!")
      return 
    }
    const value = { ... caseInfo, comments: [...(caseInfo.comments || []), ] }
    value.comments.push({
      avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=3",
      name: "李医生",
      time: dayjs().format("YYYY/MM/DD HH:mm"),
      content: commentText
    })
    setSendingComment(true)
    setTimeout(() => {
      setCommentText("")
      setCaseInfo(value)
      setSendingComment(false)
    }, 1500)
    
  }, [commentText, caseInfo])
  const { avatar = "", name = "", time = "", detail = "", comments = [] } = caseInfo ?? {}
  return <Drawer
    open
    title={"详细诊断"}
    className="myDrawer"
    height={"75%"}
    {...restProps}
  >
    <div className="patient-detail-drawer-wrapper">
      <Skeleton loading={isLoading} active={isLoading} avatar paragraph={{ rows: 12 }}>
        <div className="title-wrapper">
          <Avatar style={{ width:"50px", height: "50px", border: "1px solid  #ccc" }} src={avatar}/>
          <div className="right-block">
            <div className="name">{name}</div>
            <div className="time-wrapper">{time}</div>
          </div>
        </div>
        <div className="content">
          { detail }
        </div>
        <div className="comment-container">
          {
            comments.map(item => (<div className="comment-item-wrapper">
              <div
                className="comment-item-title" 
              >
                <Avatar src={item.avatar}/>
                <div className="title-right-block">
                  <div>{ item.name }</div>
                  <div>{ item.time }</div>
                </div>
              </div>
              <div className="comment-item-content">
                {item.content}
              </div>
            </div>))
          }
        </div>
        <div className="edit-area">
          <div className="edit-box">
            <textarea className="edit-input" onChange={(e) => setCommentText(e.target.value)} value={commentText}/>
            <div className="buttom-options">
            <div className="left-box">
              <LinkOutlined />
              <AudioOutlined />
              <DeleteOutlined />
            </div>
            <div className="right-box">
              <Button type="primary" loading={sendingComment} onClick={onComment}><SendOutlined /></Button>
            </div>
          </div>
          </div>
        </div>
      </Skeleton>

    </div>
  </Drawer>
}