import { Button, Dialog, Flex, FlexProps, color, media } from "@artsy/palette"
import { Conversation_conversation } from "v2/__generated__/Conversation_conversation.graphql"
import React, { useRef, useState } from "react"
import { Environment } from "react-relay"
import styled from "styled-components"
import { SendConversationMessage } from "../Mutation/SendConversationMessage"
import { RightProps, right } from "styled-system"

const StyledFlex = styled(Flex)<FlexProps & RightProps>`
  ${right};
  border-top: 1px solid ${color("black10")};
  position: fixed;
  background: white;
  bottom: 0;
  left: 375px;
  ${media.xs`
    width: 100%;
    left: 0;
  `}
`

const FullWidthFlex = styled(Flex)<{ height?: string }>`
  div {
    width: 100%;
    height: ${({ height }) => height};
    min-height: 40px;
  }
`

const StyledTextArea = styled.textarea<{ height?: string }>`
  border: none;
  width: 100%;
  height: ${({ height }) => height};
  max-height: calc(60vh - 145px);
  resize: none;
  min-height: 40px;
  font-size: 16px;

  ${media.xs`
    max-height: calc(60vh - 115px);
  `};
`
const StyledButton = styled(Button)``

interface ReplyProps {
  conversation: Conversation_conversation
  environment: Environment
}

export const Reply: React.FC<ReplyProps> = props => {
  const { environment, conversation } = props
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const textArea = useRef()

  const setupAndSendMessage = () => {
    {
      setLoading(true)
      return SendConversationMessage(
        environment,
        conversation,
        // @ts-ignore
        textArea?.current?.value,
        _response => {
          // @ts-ignore
          textArea.current.value = ""
          setLoading(false)
          setButtonDisabled(true)
        },
        _error => {
          setLoading(false)
          setShowModal(true)
        }
      )
    }
  }

  return (
    <>
      <Dialog
        show={showModal}
        title="We coudln’t deliver your message."
        detail="Sorry, something went wrong while sending your message. Try and resend the message or discard it."
        primaryCta={{
          action: () => {
            setShowModal(false)
            setupAndSendMessage()
          },
          text: "Retry",
        }}
        secondaryCta={{
          action: () => setShowModal(false),
          text: "Discard message",
        }}
      />
      <StyledFlex p={1} right={[0, null]} zIndex={2}>
        <FullWidthFlex width="100%">
          <StyledTextArea
            onInput={event => {
              const field = event.target as HTMLTextAreaElement
              field.style.height = "inherit"
              if (buttonDisabled && field.value.length > 2) {
                setButtonDisabled(false)
              }
              if (!buttonDisabled && field.value.length <= 2) {
                setButtonDisabled(true)
              }
              const height = field.scrollHeight
              field.style.height = height + "px"
            }}
            placeholder="Type your message"
            ref={textArea}
          />
        </FullWidthFlex>
        <Flex alignItems="flex-end">
          <StyledButton
            disabled={buttonDisabled}
            loading={loading}
            onClick={_event => {
              setupAndSendMessage()
            }}
          >
            Send
          </StyledButton>
        </Flex>
      </StyledFlex>
    </>
  )
}
