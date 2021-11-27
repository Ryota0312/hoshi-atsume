import Head from 'next/head'
import useSWR from 'swr'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import { useApi } from '../../hooks/useApi'
import { GridList, GridListItemData } from '../../components/common/GridList'
import { LoginUserOnly } from '../../components/common/LoginUserOnly'

type SpotListItem = {
  id: number
  name: string
  coverImage: string
}

const List: React.FC = () => {
  const router = useRouter()
  const { pref } = router.query

  const fetcher = useApi()
  const { data, error } = useSWR(
    !pref ? ['/api/spot/list', false] : ['/api/spot/list?pref=' + pref, false],
    fetcher,
  )

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <Layout>
      <Head>
        <title>スポット一覧</title>
      </Head>

      <main>
        <h2>スポット一覧</h2>
        <div>Area: {pref}</div>
        <LoginUserOnly>
          <Link href={'/spot/register'}>スポット登録</Link>
        </LoginUserOnly>
        {data.length === 0 && <div>スポットが登録されていません</div>}
        {data.length > 0 && (
          <GridList data={convertToGridItem(data)} link="spot/detail" />
        )}
      </main>
    </Layout>
  )
}
export default List

const convertToGridItem = (spotList: SpotListItem[]): GridListItemData[] => {
  return spotList.map((spot: SpotListItem) => {
    return {
      id: spot.id,
      title: spot.name,
      coverImage: spot.coverImage,
    } as GridListItemData
  })
}
