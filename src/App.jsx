
// ================== All Imports
                           "use client"
import                     './App.css'
import app            from './firebase.config'
import Home           from './Pages/Home/Home'
import LayoutOne      from './Layouts/LayoutOne'
import AnimatedCursor from 'react-animated-cursor'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

function App() {

  // Route Function
  const myRoute = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/' element={<LayoutOne />}>
          <Route index element={<Home />} />
        </Route>
      </Route>
    )
  )

  return (
    <>
    {/* for animatied cursor */}
      <AnimatedCursor
        color="255,255,255"
        innerSize={15}
        outerSize={30}
        outerScale={1.4}
        innerScale={1}
        outerAlpha={1}
        innerStyle={{
          mixBlendMode: 'difference',
        }}
        outerStyle={{
          mixBlendMode: 'difference',
        }}
        clickables={[
          'a',
          'input[type="text"]',
          'input[type="image"]',
          'label[for]',
          'select',
          'textarea',
          'button',
          '.link',
        ]}
      />

      {/* ========= Router Provider Part ========= */}
      <RouterProvider router={myRoute} />
    </>
  )
}

export default App
