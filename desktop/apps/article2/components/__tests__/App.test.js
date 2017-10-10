import 'jsdom-global/register'
import App from 'desktop/apps/article2/components/App'
import components from '@artsy/reaction-force/dist/Components/Publishing'
import fixtures from 'desktop/test/helpers/fixtures.coffee'
import React from 'react'
import { shallow, mount } from 'enzyme'
import * as _ from 'underscore'
import InfiniteScrollArticle from '../InfiniteScrollArticle'
import sinon from 'sinon'
const { Article } = components

describe('<App />', () => {
  it('renders a standard article', () => {
    const article = _.extend({}, fixtures.article, {
      layout: 'standard',
      vertical: {
        name: 'Art Market'
      },
      published_at: '2017-05-19T13:09:18.567Z',
      contributing_authors: [{name: 'Kana'}]
    })
    const rendered = shallow(<App article={article} templates={{}} />)
    rendered.find(InfiniteScrollArticle).length.should.equal(1)
    rendered.html().should.containEql('standard_layout')
  })

  it('renders a feature article', () => {
    const article = _.extend({}, fixtures.article, {
      layout: 'feature',
      vertical: {
        name: 'Art Market'
      },
      published_at: '2017-05-19T13:09:18.567Z',
      contributing_authors: [{name: 'Kana'}]
    })
    const rendered = shallow(<App article={article} templates={{}} />)
    rendered.find(Article).length.should.equal(1)
    rendered.html().should.containEql('feature_layout')
  })

  it('it mounts backbone views for super articles', () => {
    const article = _.extend({}, fixtures.article, {
      layout: 'feature',
      vertical: {
        name: 'Art Market'
      },
      published_at: '2017-05-19T13:09:18.567Z',
      contributing_authors: [{name: 'Kana'}],
      title: 'Super Article Title'
    })
    const SuperArticleView = sinon.stub()
    App.__Rewire__('SuperArticleView', SuperArticleView)
    const rendered = mount(
      <App
        isSuper
        article={article}
        templates={{
          SuperArticleFooter: 'sa-footer',
          SuperArticleHeader: 'sa-header'
        }}
      />
    )
    rendered.html().should.containEql('sa-footer')
    rendered.html().should.containEql('sa-header')
    SuperArticleView.called.should.be.true()
    SuperArticleView.args[0][0].article.get('title').should.equal('Super Article Title')
  })
})
