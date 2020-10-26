import { CustomTreeDataType, LevelsType } from '@/types';

let keyId = 1; // *自增Id
const keyPrefix = 'rtt-expand-'; //*自增Id前缀

// # -1 - 啥都么有
// # 0 - 收缩器
// # 1 - 竖线
// # 2 - 横线
// # 3 - 转折线
// # 4 - 交叉线
const init = (
	data: CustomTreeDataType[],
	{
		defaultExpand
	}: {
		defaultExpand: boolean
	},
	levels: LevelsType[] = [],
): CustomTreeDataType[] => data.map((item: CustomTreeDataType, index: number) => {
	const { id, sub, expand } = item;

	const newLevels: LevelsType[] = levels.map((level: LevelsType) => {
		if (level.value === 0 && index + 1 < data.length) {
			return { key: `${keyPrefix}${keyId++}`, value: 4 }
		}
		if (level.value === 0 && index + 1 === data.length) {
			return { key: `${keyPrefix}${keyId++}`, value: 3 }
		}
		if (level.value === 3) {
			return { key: `${keyPrefix}${keyId++}`, value: -1 }
		}
		if (level.value === 4) {
			return { key: `${keyPrefix}${keyId++}`, value: 1 }
		}
		return level;
	})
	if (sub && sub.length) {
		newLevels.push({ key: `${keyPrefix}${keyId++}`, value: 0 });
	} else if (newLevels.length) {
		newLevels.push({ key: `${keyPrefix}${keyId++}`, value: 2 });
	} else {
		newLevels.push({ key: `${keyPrefix}${keyId++}`, value: -1 });
	}

	return {
		...item,
		id: id || `rtt-format-data-${keyId++}`,
		levels: newLevels,
		expand: typeof expand === 'boolean' ? expand : defaultExpand,
		sub: sub && sub.length && init(sub, { defaultExpand }, newLevels)
	}
});

export default init;