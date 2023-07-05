import { Component, OnInit } from '@angular/core';
import { ResponseCode } from 'app/shared/constants/response-code';
import { ToasterService } from 'app/shared/services/toaster.service';
import { TreeNode } from 'primeng/api';
import { MenuDto } from 'shared/service-proxies/models/menu-dto.model';
import { RoleDto } from 'shared/service-proxies/models/role-dto.model';
import { RoleMenuMappingCreate_Param } from 'shared/service-proxies/models/role-menu-mapping-create-param.model';
import { MenuProxyService } from 'shared/service-proxies/services/menu-proxy-service.service';
import { RoleMenuMappingProxyService } from 'shared/service-proxies/services/role-menu-mapping-proxy-service.service';
import { RoleProxyService } from 'shared/service-proxies/services/role-proxy-service.service';

@Component({
  selector: 'app-role-menu-mapping',
  templateUrl: './role-menu-mapping.component.html',
  styleUrls: ['./role-menu-mapping.component.scss']
})
export class RoleMenuMappingComponent implements OnInit {

  menuList: MenuDto[] = [];
  selectedMenu: any;
  selectedMenus: number[] = []
  menus: TreeNode[] = [];
  userRoleId: number;
  roles: RoleDto[] = [];

  constructor(
    private _roleProxyService: RoleProxyService,
    private _menuService: MenuProxyService,
    private _menuMappingService: RoleMenuMappingProxyService,
    private _toasterService: ToasterService
  ) { }

  ngOnInit(): void {
    this.getAllMenu();
    this.getUserRoles();
  }

  getRoleMenus() {
    this.selectedMenu = [];
    if (this.userRoleId > 0) {
      this._menuMappingService.get(this.userRoleId)
        .subscribe((response: any) => {
          if (response.responseCode == ResponseCode.SUCCESSS) {
            let keysToBeSelected: any[] = []
            response.responseData.forEach(menu => {
              keysToBeSelected.push(menu.menuId);
            });
            this.checkNode(this.menus, keysToBeSelected);
          }
        });
    }
  }

  checkNode(nodes: TreeNode[], str: string[]) {
    for (let i = 0; i < nodes.length; i++) {
      if (!nodes[i].leaf && nodes[i].children[0].leaf) {
        for (let j = 0; j < nodes[i].children.length; j++) {
          if (str.includes(nodes[i].children[j].data)) {
            if (!this.selectedMenu.includes(nodes[i].children[j])) {
              this.selectedMenu.push(nodes[i].children[j]);
            }
          }
        }
      }
      if (nodes[i].leaf) {
        return;
      }
      this.checkNode(nodes[i].children, str);
      let count = nodes[i].children.length;
      let c = 0;
      for (let j = 0; j < nodes[i].children.length; j++) {
        if (this.selectedMenu.includes(nodes[i].children[j])) {
          c++;
        }
        if (nodes[i].children[j].partialSelected) nodes[i].partialSelected = true;
      }
      if (c == 0) { }
      else if (c == count) {
        nodes[i].partialSelected = false;
        if (!this.selectedMenu.includes(nodes[i])) {
          this.selectedMenu.push(nodes[i]);
        }
      }
      else {
        nodes[i].partialSelected = true;
      }
    }
  }


  getUserRoles() {
    this._roleProxyService.getAll()
      .subscribe((response: any) => {
        this.roles = response.responseData
      });
  }

  getAllMenu() {
    this._menuService.getAll()
      .subscribe((response: any) => {
        this.menuList = response.responseData

        this.menuList.forEach(menu => {
          if (menu.navigateUrl == "#" && menu.parentMenuId == 0) {
            let childMenus = this.getChildMenu(this.menuList.filter(x => x.parentMenuId == menu.id));
            let menuDetails = {
              "label": menu.menuName,
              "data": menu.id,
              "expandedIcon": `pi ${menu.icon}`,
              "collapsedIcon": `pi ${menu.icon}`,
              "children": childMenus,
              "leaf": false
            };

            this.menus.push(menuDetails);
          }
        });
      });
  }

  getChildMenu(childMenus) {
    let menus = [];
    childMenus.forEach(menu => {

      let hasChildMenus = this.menuList.filter(x => x.parentMenuId == menu.id).length > 0 ? true : false;

      if (hasChildMenus) {
        let subChildMenus = this.getChildMenu(this.menuList.filter(x => x.parentMenuId == menu.id));
        let menuDetails = {
          "label": menu.menuName,
          "data": menu.id,
          "expandedIcon": `pi ${menu.icon}`,
          "collapsedIcon": `pi ${menu.icon}`,
          "children": subChildMenus,
          "leaf": false
        };
        menus.push(menuDetails);
      } else {
        menus.push({ "label": menu.menuName, "data": menu.id, "leaf": true });
      }
    });
    return menus;
  }

  saveMapping() {
    this.selectedMenus = [];
    this.selectedMenu.forEach(menu => {
      let index = this.selectedMenus.findIndex(x => x == menu.data);
      if (index === -1) {
        this.selectedMenus.push(menu.data);
      }

      if (menu?.parent?.data) {
        let parentIndex = this.selectedMenus.findIndex(x => x == menu?.parent?.data);
        if (parentIndex === -1) {
          this.selectedMenus.push(menu?.parent.data);
        }
      }
    });

    var param: RoleMenuMappingCreate_Param = <RoleMenuMappingCreate_Param>{};
    Object.assign(param, { roleId: this.userRoleId, menuId: this.selectedMenus.join(","), isActive: true })

    this._menuMappingService.create(param)
      .subscribe((response: any) => {
        this._toasterService.toast(response);
        if (response.responseCode == ResponseCode.SUCCESSS) {
          this.resetMapping();
        }
      });
  }

  resetMapping() {
    this.selectedMenu = [];
    this.userRoleId = null;
  }

}
