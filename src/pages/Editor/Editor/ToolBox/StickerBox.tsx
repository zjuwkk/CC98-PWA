import React, { useState } from 'react'
import styled from 'styled-components'

import { DialogTitle, DialogContent, Tabs, Tab } from '@material-ui/core'

import { EditorContainer } from '../EditorContainer'

const DialogTitleS = styled(DialogTitle)`
  && {
    padding: 12px;
    padding-top: 0;
  }
`

const Img = styled.img`
  max-width: 25%;
  padding: 5px;
`

const FlexDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`

interface Props {
  editor: EditorContainer
  handleClose: () => void
}

type StickerType = 'ac' | 'tb' | 'ms' | 'em'

const BaseUrl = 'https://www.cc98.org/static/images'

// TODO: refactor with UBB
// tslint:disable-next-line
function getStickerReactNode(type: StickerType, handleFunc: Function) {
  const stickerArr = []

  const suffix = type === 'em' ? 'gif' : type === 'ac' ? 'jpg' : 'png'
  let start = 1
  let end = 54

  if (type === 'tb') {
    end = 33
  } else if (type === 'em') {
    start = 0
    end = 91
  }

  for (let i = start; i <= end; i++) {
    const number = i < 10 ? `0${i}` : `${i}`
    const url =
      type === 'ac'
        ? `${type}-mini/${number}`
        : type === 'em'
        ? `${type}/${type}${number}`
        : `${type}-mini/${type}${number}`

    stickerArr.push(
      <Img src={`${BaseUrl}/${url}.${suffix}`} onClick={handleFunc(`${type}${number}`)} />
    )
  }

  return stickerArr
}

export default ({ editor, handleClose }: Props) => {
  const [type, setType] = useState<StickerType>('ac')

  const handleChange = (_: React.ChangeEvent, value: StickerType) => {
    setType(value)
  }

  const handleClick = (stickerCode: string) => (_: React.MouseEvent<HTMLImageElement>) => {
    editor.appendMainContent(`[${stickerCode}]`)
    handleClose()
  }

  const StickerArr = getStickerReactNode(type, handleClick)

  return (
    <>
      <DialogTitleS>
        <Tabs
          value={type}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          fullWidth
          scrollable
        >
          <Tab value="ac" label="AC娘" />
          <Tab value="ms" label="雀魂" />
          <Tab value="tb" label="贴吧" />
          <Tab value="em" label="经典" />
        </Tabs>
      </DialogTitleS>

      <DialogContent>
        <FlexDiv>{StickerArr}</FlexDiv>
      </DialogContent>
    </>
  )
}
