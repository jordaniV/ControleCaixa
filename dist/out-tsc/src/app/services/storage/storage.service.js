import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
var StorageService = /** @class */ (function () {
    function StorageService(storage) {
        this.storage = storage;
        this.duplicado = false;
    }
    StorageService.prototype.getAll = function (KEY) {
        return this.storage
            .get(KEY)
            .then(function (items) {
            return items;
        });
    };
    StorageService.prototype.add = function (array, KEY) {
        var _this = this;
        return this.storage
            .get(KEY)
            .then(function (items) {
            if (items) {
                items.push(array);
                return _this.storage.set(KEY, items);
            }
            else {
                return _this.storage.set(KEY, [array]);
            }
        });
    };
    StorageService.prototype.update = function (array, KEY) {
        var _this = this;
        return this.storage
            .get(KEY)
            .then(function (items) {
            if (!items || items.length === 0) {
                return null;
            }
            var novosItems = [];
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var i = items_1[_i];
                if (i.id === array.id) {
                    novosItems.push(array);
                }
                else {
                    novosItems.push(i);
                }
            }
            return _this.storage.set(KEY, novosItems);
        });
    };
    StorageService.prototype.delete = function (id, KEY) {
        var _this = this;
        return this.storage
            .get(KEY)
            .then(function (items) {
            if (!items || items.length === 0) {
                return null;
            }
            var toKeep = [];
            for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
                var i = items_2[_i];
                if (i.id !== id) {
                    toKeep.push(i);
                }
            }
            return _this.storage.set(KEY, toKeep);
        });
    };
    StorageService.prototype.ehDuplicado = function (KEY, desc) {
        var _this = this;
        return this.storage
            .get(KEY)
            .then(function (items) {
            if (!items || items.length === 0) {
                return;
            }
            for (var _i = 0, items_3 = items; _i < items_3.length; _i++) {
                var i = items_3[_i];
                if (i.descricao === desc) {
                    _this.duplicado = true;
                    break;
                }
                else {
                    _this.duplicado = false;
                }
            }
            return _this.duplicado;
        });
    };
    StorageService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Storage])
    ], StorageService);
    return StorageService;
}());
export { StorageService };
//# sourceMappingURL=storage.service.js.map