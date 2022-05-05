import React, { useEffect } from 'react'
import useSWR from 'swr'
import styled from 'styled-components'
import { useApi } from '../../hooks/useApi'
import { TinyLoading } from '../common/TinyLoading'
import { RoundFrame } from '../common/RoundFrame'
import { MoonAgeIllustration } from './MoonAgeIllustration'

const MOON_SIZE = 100

export const MoonAge: React.FC = () => {
  const { fetcher } = useApi()
  const { data, error } = useSWR(['/api/moonAge', false], fetcher)

  useEffect(() => {
    if (data) drawMoon(data.moon_age)
  }, [data])

  if (error) return <div>failed to load</div>
  if (!data) return <TinyLoading />

  return (
    <RoundFrame>
      <div>
        <Title>月齢</Title>
        <MoonAgeIllustration moonAge={data.moon_age} size={MOON_SIZE} />
      </div>
    </RoundFrame>
  )
}

const Title = styled.div`
  font-size: 24px;
`

const pi = Math.PI,
  pi2 = pi * 2,
  topAngle = pi + (pi / 2) * 3,
  bottomAngle = pi + pi / 2,
  halfSize = MOON_SIZE / 2,
  c = [] as Array<HTMLCanvasElement>,
  ctx = [] as Array<CanvasRenderingContext2D>,
  start = [0, topAngle, 0],
  end = [pi2, bottomAngle, pi2]

const drawMoon = (age: number) => {
  for (let i = 0; i < 3; i++) {
    c[i] = document.getElementById(`a${i}`) as HTMLCanvasElement
    c[i].width = MOON_SIZE
    c[i].height = MOON_SIZE
    ctx[i] = c[i].getContext('2d') as CanvasRenderingContext2D
    ctx[i].fillStyle = i === 0 ? '#232323' : '#a4a424'
    ctx[i].arc(halfSize, halfSize, halfSize * 0.95, start[i], end[i])
    ctx[i].fill()
  }

  const r =
    29.530588853 + 2.162e-9 * ((new Date().getTime() - 946727935816) / 315576e5)
  appearance(age, r)
}

const appearance = (age: number, m: number) => {
  const s = Math.cos((pi2 * age) / m),
    s2 = Math.sin((pi2 * age) / m),
    r = Math.abs(halfSize * s)
  c[1].style.transform = `rotate(${s2 > 0 ? 180 : 0}deg)`
  ctx[2].clearRect(0, 0, MOON_SIZE, MOON_SIZE)
  ctx[2].beginPath()
  ctx[2].fillStyle = s > 0 ? '#232323' : '#a4a424'
  ctx[2].arc(halfSize, halfSize, halfSize * 0.95, 0, pi2)
  ctx[2].fill()
  c[2].style.width = `${r * 2}px`
  c[2].style.left = `${halfSize - r}px`
}
