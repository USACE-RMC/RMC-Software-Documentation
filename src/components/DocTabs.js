// DocTabs.jsx
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

export default function DocTabs({
  items = [],
  defaultValue,
  equalWidth = true,
  showDividers = true,
  gap = '',

  // Outer card
  containerClass = 'rounded-lg bg-background-color shadow-md mx-3',

  // Tabs row (doesn't style the tabs themselves)
  tabListClass = '!pl-0 !my-0 flex rounded-t-lg overflow-hidden border-b border-border-color bg-background-color dark:bg-background-color-theme',

  // Base tab (inactive by default)
  tabClass = '!mb-0 rounded-t-lg rounded-b-none px-4 py-2 text-center font-usace font-normal transition-colors ' +
    'bg-tab-color-inactive text-tab-font-color-inactive hover:bg-tab-hover-color',

  // Active state (Docusaurus sets aria-selected + tabs__item--active)
  tabActiveClass = 'aria-selected:bg-tab-color ' +
    'aria-selected:text-tab-font-color ' +
    'aria-selected:shadow-sm ' +
    'aria-selected:font-bold ' +
    'aria-selected:border-b-4 ' +
    'aria-selected:border-tab-underline-color ' +
    '[&.tabs__item--active]:bg-tab-color ' +
    '[&.tabs__item--active]:text-tab-font-color ' +
    '[&.tabs__item--active]:shadow-sm ' +
    '[&.tabs__item--active]:font-bold ' +
    '[&.tabs__item--active]:border-b-4 ' +
    '[&.tabs__item--active]:border-tab-underline-color ',

  // Panel below the tabs
  panelClass = 'rounded-b-xl bg-background-color px-4 py-3 text-base text-font-color',
}) {
  if (!items.length) return null;

  const widthCls = equalWidth ? 'flex-1 w-full' : 'flex-none';

  return (
    <div className={`not-prose ${containerClass}`}>
      <Tabs className={`${tabListClass} ${gap}`} defaultValue={defaultValue}>
        {items.map((it) => (
          <TabItem
            key={it.value}
            value={it.value}
            label={it.label}
            attributes={{
              className: [
                widthCls,
                tabClass,
                tabActiveClass,
                showDividers ? 'border-r border-border-color last:border-r-0' : '',
              ]
                .filter(Boolean)
                .join(' '),
            }}
          >
            <div className={panelClass}>{it.content}</div>
          </TabItem>
        ))}
      </Tabs>
    </div>
  );
}
