import { Link, Outlet } from 'umi';
import styles from './index.less';
import { ConfigProvider } from "antd"
import dayjs from "dayjs"
var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)
import zhCN from 'antd/locale/zh_CN';
export default function Layout() {
  return (
    <div className={styles.navs}>
      <ConfigProvider locale={zhCN}>
        <Outlet />  
      </ConfigProvider>
    </div>
  );
}
