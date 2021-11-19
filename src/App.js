
import React, { useState, useEffect } from 'react';

import alanBtn from '@alan-ai/alan-sdk-web';

import wordsToNumber from 'words-to-numbers';

import NewsCards from'./components/NewsCards/NewsCards';

import useStyles from './styles.js';

const alankey = '194c36d2260051168f655a3d024d77072e956eca572e1d8b807a3e2338fdd0dc/stage';




const App = () => {

    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    // eslint-disable-next-line
    const classes = useStyles();

   useEffect(() => {
    alanBtn({
       key: alankey,
       onCommand: ({ command, articles, number }) => {
          
          if(command === 'newHeadlines'){

            setNewsArticles(articles);
            setActiveArticle(-1);


          }else if(command === 'highlight') {
              setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
          }else if(command === 'open') {

                const parsedNumber = number.length > 2 ? wordsToNumber(number, { fuzzy: true}) : number;
                const article = articles[parsedNumber - 1];
                

                if(parsedNumber > 20) {
                  alanBtn().playText('Please try that again.')

                }else if(article) {
                  window.open(article.url, '_blank');
                  alanBtn().playText('Opening....');
                }
          }

       }

    })
   }, [])

  return(
    <div>
      <h1>Joel Ai  Application_Joejoe</h1>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      </div>
    );
}

export default App;
