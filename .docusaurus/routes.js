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
    component: ComponentCreator('/RMC-Software-Documentation/docs', '945'),
    routes: [
      {
        path: '/RMC-Software-Documentation/docs',
        component: ComponentCreator('/RMC-Software-Documentation/docs', 'b8b'),
        routes: [
          {
            path: '/RMC-Software-Documentation/docs',
            component: ComponentCreator('/RMC-Software-Documentation/docs', '290'),
            routes: [
              {
                path: '/RMC-Software-Documentation/docs/desktop-applications/lifesim/users-guide/v1.0.0/users-guide',
                component: ComponentCreator('/RMC-Software-Documentation/docs/desktop-applications/lifesim/users-guide/v1.0.0/users-guide', 'a81'),
                exact: true
              },
              {
                path: '/RMC-Software-Documentation/docs/desktop-applications/rmc-bestfit/users-guide/v1.0.0/users-guide',
                component: ComponentCreator('/RMC-Software-Documentation/docs/desktop-applications/rmc-bestfit/users-guide/v1.0.0/users-guide', '962'),
                exact: true
              },
              {
                path: '/RMC-Software-Documentation/docs/desktop-applications/rmc-rfa/users-guide/v1.0.0/users-guide',
                component: ComponentCreator('/RMC-Software-Documentation/docs/desktop-applications/rmc-rfa/users-guide/v1.0.0/users-guide', 'b2f'),
                exact: true
              },
              {
                path: '/RMC-Software-Documentation/docs/desktop-applications/rmc-totalrisk/applications-guide/v1.0.0/applications-guide',
                component: ComponentCreator('/RMC-Software-Documentation/docs/desktop-applications/rmc-totalrisk/applications-guide/v1.0.0/applications-guide', 'ff6'),
                exact: true
              },
              {
                path: '/RMC-Software-Documentation/docs/desktop-applications/rmc-totalrisk/users-guide/v1.0.0/users-guide',
                component: ComponentCreator('/RMC-Software-Documentation/docs/desktop-applications/rmc-totalrisk/users-guide/v1.0.0/users-guide', '0ea'),
                exact: true,
                sidebar: "totalRiskUsersGuideSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/desktop-applications/rmc-totalrisk/verification-report/v1.0.0/verification-report',
                component: ComponentCreator('/RMC-Software-Documentation/docs/desktop-applications/rmc-totalrisk/verification-report/v1.0.0/verification-report', 'a47'),
                exact: true
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-initiation/v1.0.0/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-initiation/v1.0.0/introduction', '26e'),
                exact: true,
                sidebar: "bepInitiationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0.0/appendix-acronyms',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0.0/appendix-acronyms', '235'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_0_0"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0.0/background',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0.0/background', 'f4b'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_0_0"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0.0/creep-ratios',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0.0/creep-ratios', '346'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_0_0"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0.0/document-info',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0.0/document-info', '5e5'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_0_0"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0.0/general-overview',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0.0/general-overview', '41d'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_0_0"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0.0/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0.0/introduction', 'f30'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_0_0"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0.0/references',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0.0/references', 'b5e'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_0_0"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0.0/schmertmann',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0.0/schmertmann', 'db5'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_0_0"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0.0/sellmeijer',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0.0/sellmeijer', 'b38'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_0_0"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0.0/summary',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0.0/summary', '2cb'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_0_0"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0.0/terms-and-conditions-for-use',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0.0/terms-and-conditions-for-use', '942'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_0_0"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0.0/version-history',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0.0/version-history', '2d2'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_0_0"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1.0/appendix-acronyms',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1.0/appendix-acronyms', '8e1'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_1_0"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1.0/background',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1.0/background', '0e5'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_1_0"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1.0/creep-ratios',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1.0/creep-ratios', '3ca'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_1_0"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1.0/document-info',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1.0/document-info', '2e2'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_1_0"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1.0/general-overview',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1.0/general-overview', '1e4'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_1_0"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1.0/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1.0/introduction', '1c6'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_1_0"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1.0/references',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1.0/references', 'f85'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_1_0"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1.0/schmertmann',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1.0/schmertmann', 'dbb'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_1_0"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1.0/sellmeijer',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1.0/sellmeijer', '21f'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_1_0"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1.0/summary',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1.0/summary', '0c5'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_1_0"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1.0/terms-and-conditions-for-use',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1.0/terms-and-conditions-for-use', '100'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_1_0"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1.0/version-history',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.1.0/version-history', '1a3'),
                exact: true,
                sidebar: "bepProgressionSidebar_v1_1_0"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/breach/v1.0.0/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/breach/v1.0.0/introduction', '299'),
                exact: true,
                sidebar: "breachSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/concentrated-leak-erosion-cracking/v1.0.0/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/concentrated-leak-erosion-cracking/v1.0.0/introduction', '4db'),
                exact: true,
                sidebar: "cleCrackingSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/concentrated-leak-erosion-initiation/v1.0.0/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/concentrated-leak-erosion-initiation/v1.0.0/introduction', '184'),
                exact: true,
                sidebar: "cleInitiationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/erodibility-parameters/v1.0.0/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/erodibility-parameters/v1.0.0/introduction', 'cb8'),
                exact: true,
                sidebar: "erodibilityParametersSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0.0/appendix-acronyms',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0.0/appendix-acronyms', '3f7'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0.0/background',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0.0/background', '61d'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0.0/base-gradation',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0.0/base-gradation', '9b3'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0.0/constricted-exit',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0.0/constricted-exit', 'fda'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0.0/design-for-particle-retention',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0.0/design-for-particle-retention', '3ff'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0.0/document-info',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0.0/document-info', '0ee'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0.0/filter-gradation',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0.0/filter-gradation', '0cb'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0.0/foster-and-fell',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0.0/foster-and-fell', '7b6'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0.0/general-overview',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0.0/general-overview', 'b4d'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0.0/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0.0/introduction', '45c'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0.0/permeability',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0.0/permeability', 'a39'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0.0/references',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0.0/references', '6ef'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0.0/summary-plot',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0.0/summary-plot', '2b7'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0.0/terms-and-conditions-for-use',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0.0/terms-and-conditions-for-use', '57a'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0.0/version-history',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0.0/version-history', '7f5'),
                exact: true,
                sidebar: "filterEvaluationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/internal-instability/v1.0.0/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/internal-instability/v1.0.0/introduction', '75d'),
                exact: true,
                sidebar: "internalInstabilitySidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0.0/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/v1.0.0/introduction', 'aa4'),
                exact: true,
                sidebar: "pipeServiceLifeSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/soil-classification/v1.0.0/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/soil-classification/v1.0.0/introduction', '850'),
                exact: true,
                sidebar: "soilClassificationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/soil-contact-erosion-initiation/v1.0.0/introduction',
                component: ComponentCreator('/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/soil-contact-erosion-initiation/v1.0.0/introduction', 'e69'),
                exact: true,
                sidebar: "soilContactErosionInitiationSidebar"
              },
              {
                path: '/RMC-Software-Documentation/docs/web-applications/dst/users-guide/v1.0.0/users-guide',
                component: ComponentCreator('/RMC-Software-Documentation/docs/web-applications/dst/users-guide/v1.0.0/users-guide', '885'),
                exact: true
              },
              {
                path: '/RMC-Software-Documentation/docs/web-applications/lst/users-guide/v1.0.0/users-guide',
                component: ComponentCreator('/RMC-Software-Documentation/docs/web-applications/lst/users-guide/v1.0.0/users-guide', '923'),
                exact: true
              },
              {
                path: '/RMC-Software-Documentation/docs/web-applications/rrft/users-guide/v1.0.0/users-guide',
                component: ComponentCreator('/RMC-Software-Documentation/docs/web-applications/rrft/users-guide/v1.0.0/users-guide', '165'),
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
