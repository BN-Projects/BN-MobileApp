import React from 'react';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import {DrawerMenu} from './DrawerMenu';

const App = () => (
  <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <DrawerMenu renderPage={pageChange("Anasayfa")}></DrawerMenu>
  </ApplicationProvider>
);
const Page = ()=>(
    <Text>aq</Text>
);
const pageChange=(pageName)=>{
  if(pageName=="Anasayfa"){
    return <Page></Page>
  }
}
export default App;