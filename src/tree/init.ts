import { ITreeData, ILevels } from '@/type';

let keyId = 1; // *自增Id
const keyPrefix = 'rtt-expand-'; //*自增Id前缀

const getExpand = ({
	id,
	expand,
	isLeaf,
	defaultExpand,
	expandedKeys,
}: {
	id: string,
	expand: boolean,
	isLeaf: boolean,
	defaultExpand: boolean,
	expandedKeys: string[],
}): boolean => {
	if (isLeaf) {
		return false;
	}
	if (expandedKeys.includes(id)) {
		return true;
	} else if (typeof expand === 'boolean') {
		return expand;
	} else {
		return defaultExpand;
	}
};

// # -1 - 啥都么有
// # 0 - 收缩器
// # 1 - 竖线
// # 2 - 横线
// # 3 - 转折线
// # 4 - 交叉线
const init = (
	data: ITreeData[],
	{
		defaultExpand,
		expandedKeys,
	}: {
		defaultExpand: boolean,
		expandedKeys: string[],
	},
	levels: ILevels[] = [],
): ITreeData[] => data.map((item: ITreeData, index: number) => {
	const { id, sub, expand, isLeaf } = item;

	const newLevels: ILevels[] = levels.map((level: ILevels) => {
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
	if ((sub && sub.length) || isLeaf) {
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
		expand: getExpand({ id, expand, isLeaf, defaultExpand, expandedKeys }),
		sub: sub && sub.length && init(sub, { defaultExpand, expandedKeys }, newLevels)
	}
});

export default init;