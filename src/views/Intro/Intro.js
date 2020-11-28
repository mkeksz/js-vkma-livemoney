import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {FixedLayout, Gallery, Div, Button} from '@vkontakte/vkui'
import {setIntro} from '@/store/actions/appActions'
import {RootPanel} from '@/roots/RootPanel/RootPanel'
import {useScheme, useLastSlide} from '@/views/Intro/intro.hooks'
import classes from './Intro.module.sass'
import {storageSet} from '@/core/bridge'


const maxIndexSlide = 2

export const Intro = () => {
  const dispatch = useDispatch()

  const [slide, setSlide] = useState(0)
  const isLastSlide = useLastSlide(slide, maxIndexSlide)
  const scheme = useScheme()

  const cls = [classes.Intro]
  if (scheme === 'light') cls.push(classes.Intro__light)

  const onClick = () => {
    if (isLastSlide) {
      dispatch(setIntro(false))
      storageSet('intro', 'true')
    } else setSlide(slide + 1)
  }
  const onChange = index => setSlide(index)

  return (
    <RootPanel>
      <div className={cls.join(' ')}>
        <Gallery
          slideWidth="100%"
          className={classes.gallery}
          bullets='light'
          onChange={onChange}
          slideIndex={slide}
        >
          <div className={classes.slide}>
            <h2>Мой бюджет</h2>
            <p>
              Помогает экономить и достигать своих целей
            </p>
          </div>
          <div className={classes.slide}>
            <p>Контроллируй расходы</p>
            <p>Не выходи за рамки бюджета</p>
          </div>
          <div className={classes.slide}>
            <p>Прокачивай финансовую грамотность!</p>
            <p>Трать деньги на то, что действительно важно!</p>
          </div>
        </Gallery>
      </div>

      <FixedLayout vertical="bottom">
        <Div>
          <Button
            mode="overlay_primary"
            size="xl"
            level="2"
            onClick={onClick}
          >
            {isLastSlide ? 'Начать' : 'Далее'}
          </Button>
        </Div>
      </FixedLayout>
    </RootPanel>
  )
}
