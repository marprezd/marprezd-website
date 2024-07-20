'use client'

import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { useTranslations } from 'next-intl'
import React from 'react'
import { Post } from '@/.velite'
import PostCard from '../posts/post-card'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from './embla-carousel-arrow-buttons'

type PropType = {
  posts: Post[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const t = useTranslations('site')
  const { options, posts } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi)

  return (
    <section>
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
        {t('posts.similar_posts.title')}
      </h2>
      <div className="embla">
        <div ref={emblaRef} className="embla__viewport">
          <div className="embla__container">
            {posts.slice(0, 6).map(post => (
              <div key={post.slug} className="embla__slide">
                <PostCard post={post} shadow="none" />
              </div>
            ))}
          </div>
        </div>
        <div className="embla__controls">
          <div className="embla__buttons">
            <PrevButton disabled={prevBtnDisabled} onClick={onPrevButtonClick} />
            <NextButton disabled={nextBtnDisabled} onClick={onNextButtonClick} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel
