import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import useSWR from 'swr'
import { useApi } from '../../hooks/useApi'
import { useAuth } from '../../hooks/useAuth'

export const LoginStatus: React.FC = () => {
  const { logout } = useAuth()
  const fetcher = useApi()
  const { data, error } = useSWR(['/api/loginUser', false], fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <Status>
      <UserName>{data.name}</UserName>
      {data.id != 0 && (
        <LogoutButton type={'button'} onClick={logout}>
          Logout
        </LogoutButton>
      )}
      {data.id == 0 && <Link href="/login">Login</Link>}
    </Status>
  )
}

const Status = styled.div`
  display: flex;
`

const UserName = styled.div`
  color: white;
  float: right;
  margin-right: 8px;
`

// スタイルこれでいいかは怪しい
const LogoutButton = styled.a`
  cursor: pointer;
  height: 1em;
`