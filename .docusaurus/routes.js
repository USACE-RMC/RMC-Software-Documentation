import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/RMC-Software-Documentation/desktop-applications',
    component: ComponentCreator('/RMC-Software-Documentation/desktop-applications', '2e1'),
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
    path: '/RMC-Software-Documentation/search',
    component: ComponentCreator('/RMC-Software-Documentation/search', '8ed'),
    exact: true
  },
  {
    path: '/RMC-Software-Documentation/toolboxes',
    component: ComponentCreator('/RMC-Software-Documentation/toolboxes', '999'),
    exact: true
  },
  {
    path: '/RMC-Software-Documentation/toolboxes/internal-erosion-suite',
    component: ComponentCreator('/RMC-Software-Documentation/toolboxes/internal-erosion-suite', '13e'),
    exact: true
  },
  {
    path: '/RMC-Software-Documentation/web-applications',
    component: ComponentCreator('/RMC-Software-Documentation/web-applications', '462'),
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
    path: '/RMC-Software-Documentation/docs',
    component: ComponentCreator('/RMC-Software-Documentation/docs', 'bfb'),
    routes: [
      {
        path: '/RMC-Software-Documentation/docs',
        component: ComponentCreator('/RMC-Software-Documentation/docs', '3a6'),
        routes: [
          {
            path: '/RMC-Software-Documentation/docs',
            component: ComponentCreator('/RMC-Software-Documentation/docs', '118'),
            routes: [
              {
                path: '/RMC-Software-Documentation/docs/desktop-applications/lifesim/users-guide/v1.0/users-guide',
                component: ComponentCreator('/RMC-Software-Documentation/docs/desktop-applications/lifesim/users-guide/v1.0/users-guide', '35e'),
                exact: true
              },
              {
                path: '/RMC-Software-Documentation/docs/desktop-applications/rmc-bestfit/users-guide/v1.0/users-guide',
                component: ComponentCreator('/RMC-Software-Documentation/docs/desktop-applications/rmc-bestfit/users-guide/v1.0/users-guide', 'e39'),
                exact: true
              },
              {
                path: '/RMC-Software-Documentation/docs/desktop-applications/rmc-rfa/users-guide/v1.0/users-guide',
                component: ComponentCreator('/RMC-Software-Documentation/docs/desktop-applications/rmc-rfa/users-guide/v1.0/users-guide', 'ad7'),
                exact: true
              },
              {
                path: '/RMC-Software-Documentation/docs/desktop-applications/rmc-totalrisk/applications-guide/v1.0/applications-guide',
                component: ComponentCreator('/RMC-Software-Documentation/docs/desktop-applications/rmc-totalrisk/applications-guide/v1.0/applications-guide', 'a76'),
                exact: true
              },
              {
                path: '/RMC-Software-Documentation/docs/desktop-applications/rmc-totalrisk/users-guide/v1.0/users-guide',
                component: ComponentCreator('/RMC-Software-Documentation/docs/desktop-applications/rmc-totalrisk/users-guide/v1.0/users-guide', '0ea'),
                exact: true,
                sidebar: "totalRiskUsersGuideSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/desktop-applications/rmc-totalrisk/verification-report/v1.0/verification-report',
                component: ComponentCreator('/RMC-Software-Documentation/docs/desktop-applications/rmc-totalrisk/verification-report/v1.0/verification-report', '2e0'),
                exact: true
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-initiation/v1.0/preface',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-initiation/v1.0/preface', '65f'),
                exact: true,
                sidebar: "bepInitiationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/appendix-acronyms',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/appendix-acronyms', 'fd9'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_0"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/background',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/background', 'b4e'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_0"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/creep-ratios',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/creep-ratios', '907'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_0"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/document-info',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/document-info', 'd5c'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_0"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/general-overview',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/general-overview', '8d3'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_0"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/preface',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/preface', '32b'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_0"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/references',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/references', '322'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_0"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/schmertmann',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/schmertmann', 'aba'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_0"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/sellmeijer',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/sellmeijer', '87a'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_0"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/summary',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/summary', 'f26'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_0"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/terms-and-conditions-for-use',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/terms-and-conditions-for-use', 'd15'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_0"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/version-history',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/version-history', '4bd'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_0"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1/appendix-acronyms',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1/appendix-acronyms', '312'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_1"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1/appendix-common-applications',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1/appendix-common-applications', '59e'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_1"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1/background',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1/background', '7d3'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_1"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1/creep-ratios',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1/creep-ratios', '67a'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_1"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1/document-info',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1/document-info', '897'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_1"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1/general-overview',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1/general-overview', 'ba0'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_1"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1/preface',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1/preface', 'ffc'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_1"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1/references',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1/references', 'a23'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_1"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1/schmertmann',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1/schmertmann', '95c'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_1"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1/sellmeijer',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1/sellmeijer', 'f1d'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_1"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1/summary',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1/summary', '891'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_1"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1/terms-and-conditions-for-use',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1/terms-and-conditions-for-use', 'dac'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_1"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1/version-history',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1/version-history', '103'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_1"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/breach/v1.0/preface',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/breach/v1.0/preface', '82b'),
                exact: true,
                sidebar: "breachSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/concentrated-leak-erosion-cracking/v1.0/preface',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/concentrated-leak-erosion-cracking/v1.0/preface', '90c'),
                exact: true,
                sidebar: "cleCrackingSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/concentrated-leak-erosion-initiation/v1.0/preface',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/concentrated-leak-erosion-initiation/v1.0/preface', 'ce9'),
                exact: true,
                sidebar: "cleInitiationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/erodibility-parameters/v1.0/preface',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/erodibility-parameters/v1.0/preface', 'd92'),
                exact: true,
                sidebar: "erodibilityParametersSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/appendix-acronyms',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/appendix-acronyms', '81c'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/background',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/background', '92f'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/base-gradation',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/base-gradation', '020'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/constricted-exit',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/constricted-exit', 'be1'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/design-for-particle-retention',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/design-for-particle-retention', 'ca3'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/document-info',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/document-info', '2e5'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/filter-gradation',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/filter-gradation', 'ad2'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/foster-and-fell',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/foster-and-fell', 'aa7'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/general-overview',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/general-overview', '62c'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/permeability',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/permeability', 'cf5'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/preface',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/preface', '1b7'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/references',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/references', '3d0'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/summary-plot',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/summary-plot', '00f'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/terms-and-conditions-for-use',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/terms-and-conditions-for-use', '7ba'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/version-history',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/version-history', '90a'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/internal-instability/v1.0/preface',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/internal-instability/v1.0/preface', '33c'),
                exact: true,
                sidebar: "internalInstabilitySidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/preface',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0/preface', '83b'),
                exact: true,
                sidebar: "pipeServiceLifeSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/soil-classification/v1.0/preface',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/soil-classification/v1.0/preface', '571'),
                exact: true,
                sidebar: "soilClassificationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/soil-contact-erosion-initiation/v1.0/preface',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/soil-contact-erosion-initiation/v1.0/preface', '726'),
                exact: true,
                sidebar: "soilContactErosionInitiationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/web-applications/dst/users-guide/v1.0/users-guide',
                component: ComponentCreator('/RMC-Software-Documentation/docs/web-applications/dst/users-guide/v1.0/users-guide', '6cb'),
                exact: true
              },
              {
                path: '/RMC-Software-Documentation/docs/web-applications/lst/users-guide/v1.0/users-guide',
                component: ComponentCreator('/RMC-Software-Documentation/docs/web-applications/lst/users-guide/v1.0/users-guide', '404'),
                exact: true
              },
              {
                path: '/RMC-Software-Documentation/docs/web-applications/rrft/users-guide/v1.0/users-guide',
                component: ComponentCreator('/RMC-Software-Documentation/docs/web-applications/rrft/users-guide/v1.0/users-guide', 'f5e'),
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
