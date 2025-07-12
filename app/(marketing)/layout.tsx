import { Children } from "react"

const Layout = ({children})=> {
 return (
  <div className="flex flex-col min-h-screen">  {children}</div>)
}   

export default Layout