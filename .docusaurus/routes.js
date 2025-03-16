import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/RMC-Software-Documentation/internal-erosion-suite',
    component: ComponentCreator('/RMC-Software-Documentation/internal-erosion-suite', 'bb5'),
    exact: true
  },
  {
    path: '/RMC-Software-Documentation/internal-erosion-suite%20copy',
    component: ComponentCreator('/RMC-Software-Documentation/internal-erosion-suite%20copy', 'b90'),
    exact: true
  },
  {
    path: '/RMC-Software-Documentation/docs',
    component: ComponentCreator('/RMC-Software-Documentation/docs', 'ed3'),
    routes: [
      {
        path: '/RMC-Software-Documentation/docs',
        component: ComponentCreator('/RMC-Software-Documentation/docs', '88e'),
        routes: [
          {
            path: '/RMC-Software-Documentation/docs',
            component: ComponentCreator('/RMC-Software-Documentation/docs', '3d9'),
            routes: [
              {
                path: '/RMC-Software-Documentation/docs/lifesim/users-guide/',
                component: ComponentCreator('/RMC-Software-Documentation/docs/lifesim/users-guide/', '09c'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/rmc-bestfit/users-guide/',
                component: ComponentCreator('/RMC-Software-Documentation/docs/rmc-bestfit/users-guide/', 'e7e'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/rmc-rfa/users-guide/',
                component: ComponentCreator('/RMC-Software-Documentation/docs/rmc-rfa/users-guide/', 'd13'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/rmc-totalrisk/applications-guide/',
                component: ComponentCreator('/RMC-Software-Documentation/docs/rmc-totalrisk/applications-guide/', 'c5f'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/rmc-totalrisk/users-guide/',
                component: ComponentCreator('/RMC-Software-Documentation/docs/rmc-totalrisk/users-guide/', 'b2c'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/rmc-totalrisk/verification-report/',
                component: ComponentCreator('/RMC-Software-Documentation/docs/rmc-totalrisk/verification-report/', '1bf'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-initiation/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-initiation/introduction', '164'),
                exact: true,
                sidebar: "bepInitiationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/introduction', 'b48'),
                exact: true,
                sidebar: "bepProgressionSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/breach/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/breach/introduction', 'f40'),
                exact: true,
                sidebar: "breachSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/concentrated-leak-erosion-cracking/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/concentrated-leak-erosion-cracking/introduction', 'bec'),
                exact: true,
                sidebar: "cleCrackingSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/concentrated-leak-erosion-initiation/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/concentrated-leak-erosion-initiation/introduction', 'eef'),
                exact: true,
                sidebar: "cleInitiationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/erodibility-parameters/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/erodibility-parameters/introduction', 'ecb'),
                exact: true,
                sidebar: "erodibilityParametersSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/appendix-acronyms',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/appendix-acronyms', 'f6d'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/background',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/background', 'e2d'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/base-gradation',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/base-gradation', '618'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/constricted-exit',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/constricted-exit', 'c63'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/design-for-particle-retention',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/design-for-particle-retention', 'aba'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/filter-gradation',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/filter-gradation', '927'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/foster-and-fell',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/foster-and-fell', 'ad1'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/general-overview',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/general-overview', '6c2'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/introduction', '5cc'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/permeability',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/permeability', '714'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/references',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/references', '14f'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/summary-plot',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/summary-plot', '5b7'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/terms-and-conditions-for-use',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/terms-and-conditions-for-use', '04c'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-instability/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-instability/introduction', '517'),
                exact: true,
                sidebar: "internalInstabilitySidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/pipe-service-life/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/pipe-service-life/introduction', 'eca'),
                exact: true,
                sidebar: "pipeServiceLifeSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/soil-classification/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/soil-classification/introduction', 'fb4'),
                exact: true,
                sidebar: "soilClassificationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/soil-contact-erosion-initiation/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/soil-contact-erosion-initiation/introduction', 'ee1'),
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
    path: '/RMC-Software-Documentation/',
    component: ComponentCreator('/RMC-Software-Documentation/', '1be'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
