import React from 'react'

const Notification = ({ notification }) => {
  const infoNotificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const errorNotificationStyle = {...infoNotificationStyle, color: 'red'}

  const messageTypeStyle = {
    info: infoNotificationStyle,
    error: errorNotificationStyle
  }

  if (notification.message === null) {
    return null
  }

  return (
    <div style={messageTypeStyle[notification.type]}>
      {notification.message}
    </div>
  )
}

export default Notification
