import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/RMC-Software-Documentation/internal-erosion-suite',
    component: ComponentCreator('/RMC-Software-Documentation/internal-erosion-suite', 'bb5'),
    exact: true
  },
  {
    path: '/RMC-Software-Documentation/docs',
    component: ComponentCreator('/RMC-Software-Documentation/docs', 'c42'),
    routes: [
      {
        path: '/RMC-Software-Documentation/docs',
        component: ComponentCreator('/RMC-Software-Documentation/docs', '9e5'),
        routes: [
          {
            path: '/RMC-Software-Documentation/docs',
            component: ComponentCreator('/RMC-Software-Documentation/docs', 'ea5'),
            routes: [
              {
                path: '/RMC-Software-Documentation/docs/lifesim/users-guide/',
                component: ComponentCreator('/RMC-Software-Documentation/docs/lifesim/users-guide/', '404'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/rmc-bestfit/users-guide/',
                component: ComponentCreator('/RMC-Software-Documentation/docs/rmc-bestfit/users-guide/', '664'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/rmc-rfa/users-guide/',
                component: ComponentCreator('/RMC-Software-Documentation/docs/rmc-rfa/users-guide/', '668'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/rmc-totalrisk/applications-guide/',
                component: ComponentCreator('/RMC-Software-Documentation/docs/rmc-totalrisk/applications-guide/', '51b'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/rmc-totalrisk/users-guide/',
                component: ComponentCreator('/RMC-Software-Documentation/docs/rmc-totalrisk/users-guide/', '65b'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/rmc-totalrisk/verification-report/',
                component: ComponentCreator('/RMC-Software-Documentation/docs/rmc-totalrisk/verification-report/', 'cf2'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-initiation/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-initiation/introduction', '07a'),
                exact: true,
                sidebar: "bepInitiationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/introduction', '858'),
                exact: true,
                sidebar: "bepProgressionSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/breach/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/breach/introduction', '324'),
                exact: true,
                sidebar: "breachSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/concentrated-leak-erosion-cracking/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/concentrated-leak-erosion-cracking/introduction', '0cf'),
                exact: true,
                sidebar: "cleCrackingSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/concentrated-leak-erosion-initiation/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/concentrated-leak-erosion-initiation/introduction', '577'),
                exact: true,
                sidebar: "cleInitiationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/erodibility-parameters/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/erodibility-parameters/introduction', 'bad'),
                exact: true,
                sidebar: "erodibilityParametersSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/appendix-acronyms',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/appendix-acronyms', '4c3'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/background',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/background', 'c72'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/base-gradation',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/base-gradation', '9b7'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/constricted-exit',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/constricted-exit', '0e5'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/design-for-particle-retention',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/design-for-particle-retention', '666'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/filter-gradation',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/filter-gradation', '606'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/foster-and-fell',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/foster-and-fell', '7fe'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/general-overview',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/general-overview', 'f28'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/introduction', 'b5e'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/permeability',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/permeability', '73b'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/references',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/references', 'a40'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/summary-plot',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/summary-plot', '889'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/terms-and-conditions-for-use',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/terms-and-conditions-for-use', '948'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-instability/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-instability/introduction', '008'),
                exact: true,
                sidebar: "internalInstabilitySidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/pipe-service-life/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/pipe-service-life/introduction', '6ad'),
                exact: true,
                sidebar: "pipeServiceLifeSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/soil-classification/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/soil-classification/introduction', '903'),
                exact: true,
                sidebar: "soilClassificationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/soil-contact-erosion-initiation/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/soil-contact-erosion-initiation/introduction', '738'),
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
