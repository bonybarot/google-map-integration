import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useAppSelector } from '../../store';
import { themeSelector } from '../../store/reducers/theme.reducer';
import EText from './EText';

interface ITabs {
  label: string;
  key: string;
  renderView: React.FunctionComponent;
}

export default function TabViewExample({ tabs }: { tabs: ITabs[] }) {
  const layout = useWindowDimensions();
  const { current } = useAppSelector(themeSelector);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(
    tabs.map(e => {
      return {
        key: e.key,
        title: e.label,
      };
    }),
  );
  const scenes = {};
  tabs.forEach(e => {
    scenes[e.key] = e.renderView;
  });
  const renderScene = SceneMap(scenes);
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={props => (
        <TabBar
          {...props}
          scrollEnabled={tabs.length > 3}
          style={{
            backgroundColor: current.tabBar,
            marginHorizontal: 10,
            paddingHorizontal: 5,
            borderRadius: 10,
          }}
          activeColor={current.new_primary}
          inactiveColor={current.black}
          // renderIndicator={() => null}
          indicatorStyle={{ backgroundColor: current.new_primary }}
          renderLabel={({ route, color }) => (
            <EText type="r" align="center" style={{ color: color }}>
              {route.title}
            </EText>
          )}
        />
      )}
      initialLayout={{ width: layout.width }}
    />
  );
}
