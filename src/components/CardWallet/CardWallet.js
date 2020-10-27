import React from 'react'
import PropTypes from 'prop-types'
import {Card, Div, Title} from '@vkontakte/vkui'
import {Icon56AddCircleOutline} from '@vkontakte/icons'
import classes from './CardWallet.module.sass'

export const CardWallet = ({styles = {backgroundColor: '', color: ''}}) => {
  const cls = [classes.CardWallet, classes.new]

  return (
    <Card className={cls.join(' ')} style={styles}>
      <Div className={classes.container}>
        <Title level="3" weight="medium">
         Всего
        </Title>
        <div className={classes.balance}>
          <Icon56AddCircleOutline />
        </div>
      </Div>
    </Card>

  // <Card>
  //   <Div>
  //     <Title level="3" weight="medium">
  //       Всего
  //     </Title>
  //     <div>
  //       <Title weight="bold" level="1">
  //         123
  //       </Title>
  //     </div>
  //   </Div>
  // </Card>
  )
}

CardWallet.propTypes = {
  styles: PropTypes.object
}
