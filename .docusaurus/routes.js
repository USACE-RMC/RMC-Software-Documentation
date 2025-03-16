import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/internal-erosion-suite',
    component: ComponentCreator('/internal-erosion-suite', '60b'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '5f0'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', 'b4e'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', 'c82'),
            routes: [
              {
                path: '/docs/lifesim/users-guide/',
                component: ComponentCreator('/docs/lifesim/users-guide/', 'bd3'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/docs/rmc-bestfit/users-guide/',
                component: ComponentCreator('/docs/rmc-bestfit/users-guide/', 'a92'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/docs/rmc-rfa/users-guide/',
                component: ComponentCreator('/docs/rmc-rfa/users-guide/', '5e4'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/docs/rmc-totalrisk/applications-guide/',
                component: ComponentCreator('/docs/rmc-totalrisk/applications-guide/', '235'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/docs/rmc-totalrisk/users-guide/',
                component: ComponentCreator('/docs/rmc-totalrisk/users-guide/', '00c'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/docs/rmc-totalrisk/verification-report/',
                component: ComponentCreator('/docs/rmc-totalrisk/verification-report/', '22b'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/backward-erosion-piping-initiation/introduction',
                component: ComponentCreator('/docs/toolbox-technical-manuals/backward-erosion-piping-initiation/introduction', '66d'),
                exact: true,
                sidebar: "bepInitiationSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/backward-erosion-piping-progression/introduction',
                component: ComponentCreator('/docs/toolbox-technical-manuals/backward-erosion-piping-progression/introduction', '285'),
                exact: true,
                sidebar: "bepProgressionSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/breach/introduction',
                component: ComponentCreator('/docs/toolbox-technical-manuals/breach/introduction', '550'),
                exact: true,
                sidebar: "breachSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/concentrated-leak-erosion-cracking/introduction',
                component: ComponentCreator('/docs/toolbox-technical-manuals/concentrated-leak-erosion-cracking/introduction', '006'),
                exact: true,
                sidebar: "cleCrackingSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/concentrated-leak-erosion-initiation/introduction',
                component: ComponentCreator('/docs/toolbox-technical-manuals/concentrated-leak-erosion-initiation/introduction', '2f2'),
                exact: true,
                sidebar: "cleInitiationSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/erodibility-parameters/introduction',
                component: ComponentCreator('/docs/toolbox-technical-manuals/erodibility-parameters/introduction', '893'),
                exact: true,
                sidebar: "erodibilityParametersSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/filter-evaluation-continuation/appendix-acronyms',
                component: ComponentCreator('/docs/toolbox-technical-manuals/filter-evaluation-continuation/appendix-acronyms', '7b9'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/filter-evaluation-continuation/background',
                component: ComponentCreator('/docs/toolbox-technical-manuals/filter-evaluation-continuation/background', '9f7'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/filter-evaluation-continuation/base-gradation',
                component: ComponentCreator('/docs/toolbox-technical-manuals/filter-evaluation-continuation/base-gradation', '2ca'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/filter-evaluation-continuation/constricted-exit',
                component: ComponentCreator('/docs/toolbox-technical-manuals/filter-evaluation-continuation/constricted-exit', 'adc'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/filter-evaluation-continuation/design-for-particle-retention',
                component: ComponentCreator('/docs/toolbox-technical-manuals/filter-evaluation-continuation/design-for-particle-retention', '41d'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/filter-evaluation-continuation/filter-gradation',
                component: ComponentCreator('/docs/toolbox-technical-manuals/filter-evaluation-continuation/filter-gradation', '7ac'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/filter-evaluation-continuation/foster-and-fell',
                component: ComponentCreator('/docs/toolbox-technical-manuals/filter-evaluation-continuation/foster-and-fell', 'ce6'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/filter-evaluation-continuation/general-overview',
                component: ComponentCreator('/docs/toolbox-technical-manuals/filter-evaluation-continuation/general-overview', '0cf'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/filter-evaluation-continuation/introduction',
                component: ComponentCreator('/docs/toolbox-technical-manuals/filter-evaluation-continuation/introduction', 'a3d'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/filter-evaluation-continuation/permeability',
                component: ComponentCreator('/docs/toolbox-technical-manuals/filter-evaluation-continuation/permeability', '5e1'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/filter-evaluation-continuation/references',
                component: ComponentCreator('/docs/toolbox-technical-manuals/filter-evaluation-continuation/references', '36f'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/filter-evaluation-continuation/summary-plot',
                component: ComponentCreator('/docs/toolbox-technical-manuals/filter-evaluation-continuation/summary-plot', '384'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/filter-evaluation-continuation/terms-and-conditions-for-use',
                component: ComponentCreator('/docs/toolbox-technical-manuals/filter-evaluation-continuation/terms-and-conditions-for-use', '0c5'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/internal-instability/introduction',
                component: ComponentCreator('/docs/toolbox-technical-manuals/internal-instability/introduction', 'e7c'),
                exact: true,
                sidebar: "internalInstabilitySidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/pipe-service-life/introduction',
                component: ComponentCreator('/docs/toolbox-technical-manuals/pipe-service-life/introduction', '1ce'),
                exact: true,
                sidebar: "pipeServiceLifeSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/soil-classification/introduction',
                component: ComponentCreator('/docs/toolbox-technical-manuals/soil-classification/introduction', 'd25'),
                exact: true,
                sidebar: "soilClassificationSidebar"
              },
              {
                path: '/docs/toolbox-technical-manuals/soil-contact-erosion-initiation/introduction',
                component: ComponentCreator('/docs/toolbox-technical-manuals/soil-contact-erosion-initiation/introduction', '882'),
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
