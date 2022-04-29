import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/en';
import { NgZorroAntdModule, NZ_I18N, NZ_ICONS, zh_CN } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
registerLocaleData(zh);
const antDesignIcons = AllIcons as {
	[key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map((key) => antDesignIcons[key]);
@NgModule({
	declarations: [],
	imports: [CommonModule, NgZorroAntdModule, ReactiveFormsModule, FormsModule],
	providers: [{ provide: NZ_ICONS, useValue: icons } ],
	exports: [ReactiveFormsModule, FormsModule, NgZorroAntdModule, NzAvatarModule],
})
export class SharedModule {}

