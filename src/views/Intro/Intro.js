import React from 'react'
import {useDispatch} from 'react-redux'
import {FixedLayout, Gallery, Div, Button} from '@vkontakte/vkui'
import {PAGES} from '@/constants/constants'
import {nextPage} from '@/store/actions/appActions'
import classes from './Intro.module.sass'
import {RootPanel} from '@/roots/RootPanel/RootPanel'


export const Intro = () => {
  const dispatch = useDispatch()

  const buttonHandler = () => dispatch(nextPage({
    view: PAGES.MAIN,
    epic: PAGES.WALLETS
  }))

  return (
    <RootPanel>
      <div className={classes.Intro}>
        <Gallery
          slideWidth="100%"
          className={classes.gallery}
          bullets="light"
        >
          <div>
            <h2>Текст 1</h2>
          </div>
          <div>
            <h2>Текст 2</h2>
          </div>
          <div>
            <h2>Текст 3</h2>
          </div>
        </Gallery>
      </div>

      <FixedLayout vertical="bottom">
        <Div>
          <Button
            mode="overlay_primary"
            size="xl"
            level="2"
            onClick={buttonHandler}
          >
            Текст
          </Button>
        </Div>
      </FixedLayout>
    </RootPanel>
  )
}
