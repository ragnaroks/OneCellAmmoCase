import {DependencyContainer} from 'tsyringe';
import {IPostDBLoadMod} from '@spt-aki/models/external/IPostDBLoadMod';
import {ILogger} from "@spt-aki/models/spt/utils/ILogger";
import {DatabaseServer} from '@spt-aki/servers/DatabaseServer';
import {IDatabaseTables} from '@spt-aki/models/spt/server/IDatabaseTables';

const parentId:string = '5795f317245977243854e041';
const idArray:Array<string> = [
    '5c0a840b86f7742ffa4f2482', // THICC 物品箱
    '5c093db286f7740a1b2617e3', // 食品保温箱
    '5e2af55f86f7746d4159f07c', // 手榴弹箱
    '619cbf9e0a7c3a1a2731940a', // 钥匙卡收纳盒
    '5b6d9ce188a4501afc1b2b25', // THICC 武器箱
    '619cbf7d23893217ec30b689', // 注射器收纳盒
    '5d235bb686f77443f4331278', // 小型 SICC 包
    '5783c43d2459774bbe137486', // 简易钱包
    '590c60fc86f77412b13fddcf', // 文件包
    '5aafbde786f774389d0cbc0f', // 弹药箱
    '62a09d3bcf4a99369e262447', // Gingy 钥匙串
    '59fb042886f7746c5005a7b2', // 物品箱
    '5b7c710788a4506dec015957', // 幸运 SCAV 垃圾箱
    '59fb016586f7746d0d4b423a', // 钱箱
    '59fb023c86f7746d0d4b423c', // 武器箱
    '60b0f6c058e0b0481a09ad11', // WZ 钱包
    '5aafbcd986f7745e590fff23', // 医疗物品箱
    '5c093e3486f77430cb02e593', // 狗牌包
    '59fafd4b86f7745ca07e1232', // 钥匙收纳器
    '5c127c4486f7745625356c13', // 弹匣箱
];

class Mod implements IPostDBLoadMod {
    public postDBLoad(container:DependencyContainer): void {
        const logger = container.resolve<ILogger>('WinstonLogger');
        const databaseServer = container.resolve<DatabaseServer>('DatabaseServer');
        
        const tables:IDatabaseTables = databaseServer.getTables();

        for (const iterator of idArray) {
            const template = tables.templates.items[iterator] || null;
            if(!template){continue;}
            if(template._parent !== parentId){continue;}
            template._props.Weight = 0;
            template._props.Width = 1;
            template._props.Height = 1;
        }

        logger.warning('[OneCellCases]: cases width and height modified');
    }
}

module.exports = {
    mod: new Mod()
};
