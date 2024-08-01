import React from 'react'
import Mapping from './mapping/Mapping'
import { Provider } from 'react-redux'
import store from './component/Redux/Store/store'

const App = () => {

  return (
 <>
 <Provider store={store}>
    <Mapping/>
 </Provider>
  
 </>
  )
}

export default App