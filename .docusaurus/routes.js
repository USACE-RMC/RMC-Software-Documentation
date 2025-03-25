import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/RMC-Software-Documentation/desktop-applications/desktop-applications',
    component: ComponentCreator('/RMC-Software-Documentation/desktop-applications/desktop-applications', 'a9d'),
    exact: true
  },
  {
    path: '/RMC-Software-Documentation/desktop-applications/lifesim',
    component: ComponentCreator('/RMC-Software-Documentation/desktop-applications/lifesim', '3ab'),
    exact: true
  },
  {
    path: '/RMC-Software-Documentation/desktop-applications/rmc-bestfit',
    component: ComponentCreator('/RMC-Software-Documentation/desktop-applications/rmc-bestfit', 'eba'),
    exact: true
  },
  {
    path: '/RMC-Software-Documentation/desktop-applications/rmc-rfa',
    component: ComponentCreator('/RMC-Software-Documentation/desktop-applications/rmc-rfa', '927'),
    exact: true
  },
  {
    path: '/RMC-Software-Documentation/desktop-applications/rmc-totalrisk',
    component: ComponentCreator('/RMC-Software-Documentation/desktop-applications/rmc-totalrisk', 'a75'),
    exact: true
  },
  {
    path: '/RMC-Software-Documentation/toolboxes/internal-erosion-suite',
    component: ComponentCreator('/RMC-Software-Documentation/toolboxes/internal-erosion-suite', '13e'),
    exact: true
  },
  {
    path: '/RMC-Software-Documentation/toolboxes/toolboxes',
    component: ComponentCreator('/RMC-Software-Documentation/toolboxes/toolboxes', '25e'),
    exact: true
  },
  {
    path: '/RMC-Software-Documentation/web-applications/dst',
    component: ComponentCreator('/RMC-Software-Documentation/web-applications/dst', '8b8'),
    exact: true
  },
  {
    path: '/RMC-Software-Documentation/web-applications/lst',
    component: ComponentCreator('/RMC-Software-Documentation/web-applications/lst', '34b'),
    exact: true
  },
  {
    path: '/RMC-Software-Documentation/web-applications/rrft',
    component: ComponentCreator('/RMC-Software-Documentation/web-applications/rrft', '812'),
    exact: true
  },
  {
    path: '/RMC-Software-Documentation/web-applications/web-applications',
    component: ComponentCreator('/RMC-Software-Documentation/web-applications/web-applications', 'cd8'),
    exact: true
  },
  {
    path: '/RMC-Software-Documentation/docs',
    component: ComponentCreator('/RMC-Software-Documentation/docs', '06a'),
    routes: [
      {
        path: '/RMC-Software-Documentation/docs',
        component: ComponentCreator('/RMC-Software-Documentation/docs', '56f'),
        routes: [
          {
            path: '/RMC-Software-Documentation/docs',
            component: ComponentCreator('/RMC-Software-Documentation/docs', 'e25'),
            routes: [
              {
                path: '/RMC-Software-Documentation/docs/desktop-applications/lifesim/users-guide/',
                component: ComponentCreator('/RMC-Software-Documentation/docs/desktop-applications/lifesim/users-guide/', 'b27'),
                exact: true
              },
              {
                path: '/RMC-Software-Documentation/docs/desktop-applications/rmc-bestfit/users-guide/',
                component: ComponentCreator('/RMC-Software-Documentation/docs/desktop-applications/rmc-bestfit/users-guide/', '088'),
                exact: true
              },
              {
                path: '/RMC-Software-Documentation/docs/desktop-applications/rmc-rfa/users-guide/',
                component: ComponentCreator('/RMC-Software-Documentation/docs/desktop-applications/rmc-rfa/users-guide/', '12b'),
                exact: true
              },
              {
                path: '/RMC-Software-Documentation/docs/desktop-applications/rmc-totalrisk/applications-guide/',
                component: ComponentCreator('/RMC-Software-Documentation/docs/desktop-applications/rmc-totalrisk/applications-guide/', '110'),
                exact: true
              },
              {
                path: '/RMC-Software-Documentation/docs/desktop-applications/rmc-totalrisk/users-guide/',
                component: ComponentCreator('/RMC-Software-Documentation/docs/desktop-applications/rmc-totalrisk/users-guide/', 'c6f'),
                exact: true,
                sidebar: "totalRiskUsersGuideSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/desktop-applications/rmc-totalrisk/verification-report/',
                component: ComponentCreator('/RMC-Software-Documentation/docs/desktop-applications/rmc-totalrisk/verification-report/', '6bd'),
                exact: true
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-initiation/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-initiation/introduction', '164'),
                exact: true,
                sidebar: "bepInitiationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/appendix-acronyms',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/appendix-acronyms', '585'),
                exact: true,
                sidebar: "bepProgressionSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/background',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/background', '5d3'),
                exact: true,
                sidebar: "bepProgressionSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/creep-ratios',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/creep-ratios', '31b'),
                exact: true,
                sidebar: "bepProgressionSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/general-overview',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/general-overview', '311'),
                exact: true,
                sidebar: "bepProgressionSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/introduction', '06f'),
                exact: true,
                sidebar: "bepProgressionSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/references',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/references', 'b9a'),
                exact: true,
                sidebar: "bepProgressionSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/schmertmann',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/schmertmann', 'b50'),
                exact: true,
                sidebar: "bepProgressionSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/sellmeijer',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/sellmeijer', '9d6'),
                exact: true,
                sidebar: "bepProgressionSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/summary',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/summary', 'edc'),
                exact: true,
                sidebar: "bepProgressionSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/terms-and-conditions-for-use',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/terms-and-conditions-for-use', 'e4e'),
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
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/appendix-acronyms', '96f'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/background',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/background', '9ef'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/base-gradation',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/base-gradation', 'ef3'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/constricted-exit',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/constricted-exit', '1bc'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/design-for-particle-retention',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/design-for-particle-retention', '9fc'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/filter-gradation',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/filter-gradation', '25c'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/foster-and-fell',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/foster-and-fell', '558'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/general-overview',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/general-overview', '9f0'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/introduction', 'b89'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/permeability',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/permeability', 'd0e'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/references',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/references', 'eea'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/summary-plot',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/summary-plot', 'a00'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/terms-and-conditions-for-use',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/terms-and-conditions-for-use', '40c'),
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
              },
              {
                path: '/RMC-Software-Documentation/docs/web-applications/dst/users-guide/',
                component: ComponentCreator('/RMC-Software-Documentation/docs/web-applications/dst/users-guide/', '90f'),
                exact: true
              },
              {
                path: '/RMC-Software-Documentation/docs/web-applications/lst/users-guide/',
                component: ComponentCreator('/RMC-Software-Documentation/docs/web-applications/lst/users-guide/', 'bcd'),
                exact: true
              },
              {
                path: '/RMC-Software-Documentation/docs/web-applications/rrft/users-guide/',
                component: ComponentCreator('/RMC-Software-Documentation/docs/web-applications/rrft/users-guide/', '069'),
                exact: true
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
