import React from 'react'
import styled from 'styled-components'
import { FormSwitcher } from '@artsy/reaction/dist/Components/Authentication/Desktop/FormSwitcher'
import { ModalType } from '@artsy/reaction/dist/Components/Authentication/Types'
import { DesktopHeader } from '@artsy/reaction/dist/Components/Authentication/Desktop/Components/DesktopHeader'

interface Props {
  type: string
  subtitle?: string
}

export class AuthStatic extends React.Component<Props> {
  render() {
    return (
      <AuthFormContainer>
        <DesktopHeader subtitle={this.props.subtitle} />
        <FormSwitcher
          {...this.props}
          type={this.props.type as ModalType}
          handleSubmit={() => {
            console.log('here.')
          }}
        />
      </AuthFormContainer>
    )
  }
}

const AuthFormContainer = styled.div`
  max-width: 400px;
  margin: auto;
`
