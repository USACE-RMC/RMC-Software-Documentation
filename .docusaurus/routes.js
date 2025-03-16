import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/internal-erosion-suite',
    component: ComponentCreator('/internal-erosion-suite', '60b'),
    exact: true
  },
  {
    path: '/internal-erosion-suite%20copy',
    component: ComponentCreator('/internal-erosion-suite%20copy', 'f7c'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '1c2'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '346'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '258'),
            routes: [
              {
                path: '/docs/lifesim/users-guide/',
                component: ComponentCreator('/docs/lifesim/users-guide/', '553'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/docs/rmc-bestfit/users-guide/',
                component: ComponentCreator('/docs/rmc-bestfit/users-guide/', '6e6'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/docs/rmc-rfa/users-guide/',
                component: ComponentCreator('/docs/rmc-rfa/users-guide/', '9ef'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/docs/rmc-totalrisk/applications-guide/',
                component: ComponentCreator('/docs/rmc-totalrisk/applications-guide/', '174'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/docs/rmc-totalrisk/users-guide/',
                component: ComponentCreator('/docs/rmc-totalrisk/users-guide/', '5c0'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/docs/rmc-totalrisk/verification-report/',
                component: ComponentCreator('/docs/rmc-totalrisk/verification-report/', '0f6'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/backward-erosion-piping-initiation/introduction',
                component: ComponentCreator('/docs/toolbox-technical-manuals/backward-erosion-piping-initiation/introduction', '208'),
                exact: true,
                sidebar: "bepInitiationSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/backward-erosion-piping-progression/introduction',
                component: ComponentCreator('/docs/toolbox-technical-manuals/backward-erosion-piping-progression/introduction', '4d2'),
                exact: true,
                sidebar: "bepProgressionSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/breach/introduction',
                component: ComponentCreator('/docs/toolbox-technical-manuals/breach/introduction', '407'),
                exact: true,
                sidebar: "breachSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/concentrated-leak-erosion-cracking/introduction',
                component: ComponentCreator('/docs/toolbox-technical-manuals/concentrated-leak-erosion-cracking/introduction', 'c8b'),
                exact: true,
                sidebar: "cleCrackingSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/concentrated-leak-erosion-initiation/introduction',
                component: ComponentCreator('/docs/toolbox-technical-manuals/concentrated-leak-erosion-initiation/introduction', 'dec'),
                exact: true,
                sidebar: "cleInitiationSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/erodibility-parameters/introduction',
                component: ComponentCreator('/docs/toolbox-technical-manuals/erodibility-parameters/introduction', 'a36'),
                exact: true,
                sidebar: "erodibilityParametersSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/filter-evaluation-continuation/appendix-acronyms',
                component: ComponentCreator('/docs/toolbox-technical-manuals/filter-evaluation-continuation/appendix-acronyms', '034'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/filter-evaluation-continuation/background',
                component: ComponentCreator('/docs/toolbox-technical-manuals/filter-evaluation-continuation/background', '56a'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/filter-evaluation-continuation/base-gradation',
                component: ComponentCreator('/docs/toolbox-technical-manuals/filter-evaluation-continuation/base-gradation', 'f2e'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/filter-evaluation-continuation/constricted-exit',
                component: ComponentCreator('/docs/toolbox-technical-manuals/filter-evaluation-continuation/constricted-exit', '7d1'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/filter-evaluation-continuation/design-for-particle-retention',
                component: ComponentCreator('/docs/toolbox-technical-manuals/filter-evaluation-continuation/design-for-particle-retention', 'd82'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/filter-evaluation-continuation/filter-gradation',
                component: ComponentCreator('/docs/toolbox-technical-manuals/filter-evaluation-continuation/filter-gradation', '6b9'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/filter-evaluation-continuation/foster-and-fell',
                component: ComponentCreator('/docs/toolbox-technical-manuals/filter-evaluation-continuation/foster-and-fell', '284'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/filter-evaluation-continuation/general-overview',
                component: ComponentCreator('/docs/toolbox-technical-manuals/filter-evaluation-continuation/general-overview', '7e6'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/filter-evaluation-continuation/introduction',
                component: ComponentCreator('/docs/toolbox-technical-manuals/filter-evaluation-continuation/introduction', '390'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/filter-evaluation-continuation/permeability',
                component: ComponentCreator('/docs/toolbox-technical-manuals/filter-evaluation-continuation/permeability', '7f5'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/filter-evaluation-continuation/references',
                component: ComponentCreator('/docs/toolbox-technical-manuals/filter-evaluation-continuation/references', 'f52'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/filter-evaluation-continuation/summary-plot',
                component: ComponentCreator('/docs/toolbox-technical-manuals/filter-evaluation-continuation/summary-plot', '1e5'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/filter-evaluation-continuation/terms-and-conditions-for-use',
                component: ComponentCreator('/docs/toolbox-technical-manuals/filter-evaluation-continuation/terms-and-conditions-for-use', '3a6'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/internal-instability/introduction',
                component: ComponentCreator('/docs/toolbox-technical-manuals/internal-instability/introduction', 'bb4'),
                exact: true,
                sidebar: "internalInstabilitySidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/pipe-service-life/introduction',
                component: ComponentCreator('/docs/toolbox-technical-manuals/pipe-service-life/introduction', '998'),
                exact: true,
                sidebar: "pipeServiceLifeSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/soil-classification/introduction',
                component: ComponentCreator('/docs/toolbox-technical-manuals/soil-classification/introduction', '536'),
                exact: true,
                sidebar: "soilClassificationSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/soil-contact-erosion-initiation/introduction',
                component: ComponentCreator('/docs/toolbox-technical-manuals/soil-contact-erosion-initiation/introduction', 'c21'),
                exact: true,
                sidebar: "soilContactErosionInitiationSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '2e1'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
