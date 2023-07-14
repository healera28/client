import { Button } from 'antd'
import React from 'react'
import { DownloadOutlined } from '@ant-design/icons'
import { styled } from 'styled-components'
import { useSelector } from 'react-redux'
import objectToCsv from '../../../utiles/objectToCsv'

export default function DownloadBtn() {
  const users = useSelector(state => state.user.users)

  const handleDownload = () => {
    const csvData = objectToCsv(users)
    const csvBlob = new Blob([csvData], { type: 'text/csv' })
    const csvUrl = URL.createObjectURL(csvBlob)
    
    const link = document.createElement('a')
    link.href = csvUrl
    link.download = "users.csv"
    
    link.click()
  }

  return (
    <SButton onClick={handleDownload}><DownloadOutlined /></SButton>
  )
}

const SButton = styled(Button)`
  width: 40px;
  display:flex;
  justify-content:center;
  align-items:center;
`