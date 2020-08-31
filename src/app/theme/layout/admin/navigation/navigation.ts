import {Injectable} from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItemsAdmin = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard/default',
        classes: 'nav-item',
        icon: 'feather icon-home'
      },
      {
        id: 'page-layouts',
        title: 'Gestion  Commandes',
        type: 'collapse',
        icon: 'feather icon-layout',
        children: [
          {
            id: 'vertical',
            title: 'Commandes a validées',
            type: 'item',
            url: '/layout/static'
          },
          {
            id: 'horizontal',
            title: 'Commandes  validées',
            type: 'item',
            url: '/layout/horizontal'
          }
        ]
      }
    ]
  },

  {
    id: 'pages',
    title: 'Pages',
    type: 'group',
    icon: 'feather icon-file-text',
    children: [
      {
        id: 'auth',
        title: 'Authentication',
        type: 'collapse',
        icon: 'feather icon-lock',
        children: [
          {
            id: 'signup',
            title: 'Sign up',
            type: 'item',
            url: '/auth/signup',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'signin',
            title: 'Sign in',
            type: 'item',
            url: '/auth/signin',
            target: true,
            breadcrumbs: false
          }
        ]
      },
      {
        id: 'sample-page',
        title: 'Gestion des Utilisateurs',
        type: 'item',
        url: '/dashboard/default/sample-page',
        classes: 'nav-item',
        icon: 'feather icon-sidebar'
      }
    ]
  }
];
const NavigationItemsUser = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'sample-page',
        title: 'Les Produits',
        type: 'item',
        url: '/dashboard/default/basic/button',
        classes: 'nav-item',
        icon: 'feather icon-sidebar'
      },
      {
        id: 'page-layouts',
        title: 'Mes Commandes',
        type: 'collapse',
        icon: 'feather icon-layout',
        children: [
          {
            id: 'horizontal',
            title: 'Mon Panier',
            type: 'item',
            url: '/dashboard/default/basic/toasts'
          },
          {
            id: 'vertical',
            title: ' valider ma commande',
            type: 'item',
            url: '/dashboard/default/forms/basic'
          }
         
        ]
      }
    ]
  }
  // {
    
  //     id: 'sample-page',
  //     title: 'Les Produits',
  //     type: 'item',
  //     url: '/dashboard/default/basic/button',
  //     classes: 'nav-item',
  //     icon: 'feather icon-sidebar'
      
  // }
  
  
];

@Injectable()
export class NavigationItem {
  public get() {
    let roles = localStorage.getItem('roles');
    if(roles){
      roles = JSON.parse(roles);
      if(roles[0]['authority']=="ROLE_ADMINISTRATEUR") return NavigationItemsAdmin;
      else return NavigationItemsUser;
    }
   
    return;
  }
}
