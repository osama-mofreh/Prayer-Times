import { React } from 'react'

const ApiTrial = ({name,message,email}) =>
{
  

  return (
    <div>
      <h1>{name}</h1>
      <h2>{message}</h2>
      <h3>{email}</h3>
    </div>
  )
}

export default ApiTrial