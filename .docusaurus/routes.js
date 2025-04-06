import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/RMC-Software-Documentation/__docusaurus/debug',
    component: ComponentCreator('/RMC-Software-Documentation/__docusaurus/debug', '571'),
    exact: true
  },
  {
    path: '/RMC-Software-Documentation/__docusaurus/debug/config',
    component: ComponentCreator('/RMC-Software-Documentation/__docusaurus/debug/config', 'cd3'),
    exact: true
  },
  {
    path: '/RMC-Software-Documentation/__docusaurus/debug/content',
    component: ComponentCreator('/RMC-Software-Documentation/__docusaurus/debug/content', '298'),
    exact: true
  },
  {
    path: '/RMC-Software-Documentation/__docusaurus/debug/globalData',
    component: ComponentCreator('/RMC-Software-Documentation/__docusaurus/debug/globalData', 'fbc'),
    exact: true
  },
  {
    path: '/RMC-Software-Documentation/__docusaurus/debug/metadata',
    component: ComponentCreator('/RMC-Software-Documentation/__docusaurus/debug/metadata', '94a'),
    exact: true
  },
  {
    path: '/RMC-Software-Documentation/__docusaurus/debug/registry',
    component: ComponentCreator('/RMC-Software-Documentation/__docusaurus/debug/registry', 'd7e'),
    exact: true
  },
  {
    path: '/RMC-Software-Documentation/__docusaurus/debug/routes',
    component: ComponentCreator('/RMC-Software-Documentation/__docusaurus/debug/routes', '446'),
    exact: true
  },
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
    component: ComponentCreator('/RMC-Software-Documentation/docs', '996'),
    routes: [
      {
        path: '/RMC-Software-Documentation/docs',
        component: ComponentCreator('/RMC-Software-Documentation/docs', 'cd7'),
        routes: [
          {
            path: '/RMC-Software-Documentation/docs',
            component: ComponentCreator('/RMC-Software-Documentation/docs', '0c2'),
            routes: [
              {
                path: '/RMC-Software-Documentation/docs/desktop-applications/lifesim/users-guide/',
                component: ComponentCreator('/RMC-Software-Documentation/docs/desktop-applications/lifesim/users-guide/', '072'),
                exact: true
              },
              {
                path: '/RMC-Software-Documentation/docs/desktop-applications/rmc-bestfit/users-guide/',
                component: ComponentCreator('/RMC-Software-Documentation/docs/desktop-applications/rmc-bestfit/users-guide/', '7db'),
                exact: true
              },
              {
                path: '/RMC-Software-Documentation/docs/desktop-applications/rmc-rfa/users-guide/',
                component: ComponentCreator('/RMC-Software-Documentation/docs/desktop-applications/rmc-rfa/users-guide/', '553'),
                exact: true
              },
              {
                path: '/RMC-Software-Documentation/docs/desktop-applications/rmc-totalrisk/applications-guide/',
                component: ComponentCreator('/RMC-Software-Documentation/docs/desktop-applications/rmc-totalrisk/applications-guide/', '699'),
                exact: true
              },
              {
                path: '/RMC-Software-Documentation/docs/desktop-applications/rmc-totalrisk/users-guide/',
                component: ComponentCreator('/RMC-Software-Documentation/docs/desktop-applications/rmc-totalrisk/users-guide/', '8f3'),
                exact: true,
                sidebar: "totalRiskUsersGuideSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/desktop-applications/rmc-totalrisk/verification-report/',
                component: ComponentCreator('/RMC-Software-Documentation/docs/desktop-applications/rmc-totalrisk/verification-report/', '1ba'),
                exact: true
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-initiation/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-initiation/introduction', 'eae'),
                exact: true,
                sidebar: "bepInitiationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/appendix-acronyms',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/appendix-acronyms', '2e1'),
                exact: true,
                sidebar: "bepProgressionSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/background',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/background', '77d'),
                exact: true,
                sidebar: "bepProgressionSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/creep-ratios',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/creep-ratios', 'c31'),
                exact: true,
                sidebar: "bepProgressionSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/general-overview',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/general-overview', 'f27'),
                exact: true,
                sidebar: "bepProgressionSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/introduction', '168'),
                exact: true,
                sidebar: "bepProgressionSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/references',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/references', '378'),
                exact: true,
                sidebar: "bepProgressionSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/schmertmann',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/schmertmann', 'bb7'),
                exact: true,
                sidebar: "bepProgressionSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/sellmeijer',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/sellmeijer', '937'),
                exact: true,
                sidebar: "bepProgressionSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/summary',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/summary', 'b3f'),
                exact: true,
                sidebar: "bepProgressionSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/terms-and-conditions-for-use',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/backward-erosion-piping-progression/terms-and-conditions-for-use', '926'),
                exact: true,
                sidebar: "bepProgressionSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/breach/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/breach/introduction', '86d'),
                exact: true,
                sidebar: "breachSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/concentrated-leak-erosion-cracking/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/concentrated-leak-erosion-cracking/introduction', 'd7b'),
                exact: true,
                sidebar: "cleCrackingSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/concentrated-leak-erosion-initiation/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/concentrated-leak-erosion-initiation/introduction', '5ed'),
                exact: true,
                sidebar: "cleInitiationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/erodibility-parameters/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/erodibility-parameters/introduction', 'b9a'),
                exact: true,
                sidebar: "erodibilityParametersSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/appendix-acronyms',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/appendix-acronyms', '088'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/background',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/background', '2d1'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/base-gradation',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/base-gradation', '8c5'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/constricted-exit',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/constricted-exit', '78c'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/design-for-particle-retention',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/design-for-particle-retention', '30c'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/filter-gradation',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/filter-gradation', '188'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/foster-and-fell',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/foster-and-fell', '05f'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/general-overview',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/general-overview', '70b'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/introduction', '0be'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/permeability',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/permeability', '602'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/references',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/references', '9e0'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/report-documentation',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/report-documentation', '651'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/summary-plot',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/summary-plot', 'f42'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/terms-and-conditions-for-use',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/filter-evaluation-continuation/terms-and-conditions-for-use', 'f33'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-instability/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-instability/introduction', '6e8'),
                exact: true,
                sidebar: "internalInstabilitySidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/pipe-service-life/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/pipe-service-life/introduction', '6d3'),
                exact: true,
                sidebar: "pipeServiceLifeSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/soil-classification/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/soil-classification/introduction', 'c96'),
                exact: true,
                sidebar: "soilClassificationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/soil-contact-erosion-initiation/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/soil-contact-erosion-initiation/introduction', '95e'),
                exact: true,
                sidebar: "soilContactErosionInitiationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/web-applications/dst/users-guide/',
                component: ComponentCreator('/RMC-Software-Documentation/docs/web-applications/dst/users-guide/', '3db'),
                exact: true
              },
              {
                path: '/RMC-Software-Documentation/docs/web-applications/lst/users-guide/',
                component: ComponentCreator('/RMC-Software-Documentation/docs/web-applications/lst/users-guide/', 'f0c'),
                exact: true
              },
              {
                path: '/RMC-Software-Documentation/docs/web-applications/rrft/users-guide/',
                component: ComponentCreator('/RMC-Software-Documentation/docs/web-applications/rrft/users-guide/', '4af'),
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
