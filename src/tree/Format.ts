import { ITreeDataBase, FormatData, ILevels } from '../types/type'
import { keyPrefix, formatIdPrefix } from './constants';

let keyId = 1; // *自增Id

const getExpand = ({
	id,
	expand,
	isLeaf,
	defaultExpand,
	expandedKeys,
}: {
	id: string,
	expand: boolean | undefined | null,
	isLeaf: boolean,
	defaultExpand: boolean,
	expandedKeys?: string[],
}): boolean => {
	if (isLeaf) {
		return false;
	}
	if (expandedKeys && expandedKeys.includes(id)) {
		return true;
	} else if (typeof expand === 'boolean') {
		return expand;
	} else {
		return defaultExpand;
	}
};

const formatData = (
	data: ITreeDataBase[] | FormatData[],
	{
		defaultExpand,
		expandedKeys,
	}: {
		defaultExpand: boolean,
		expandedKeys?: string[],
	},
	levels: ILevels[] = [],
): FormatData[] => (data as FormatData[]).map((item, index) => {
	const { id, sub, expand, isLeaf, isLoading } = item,
		currentId = id || `${formatIdPrefix}${keyId++}`;

	/**
	 * 生成占位符
	 * 
	 ** -1 - 啥都么有
	 **  0 - 收缩器
	 **  1 - 竖线
	 **  2 - 横线
	 **  3 - 转折线
	 **  4 - 交叉线
	 */
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

	const result: FormatData = {
		id: currentId,
		levels: newLevels,
		isLeaf: !!isLeaf,
		isLoading: !!isLoading,
		expand: getExpand({
			id: currentId,
			expand,
			isLeaf: !!isLeaf,
			defaultExpand,
			expandedKeys,
		}),
		sub: [],
		_source: item._source ? item._source : item as unknown as ITreeDataBase,
	}

	if (sub?.length) {
		result.sub = formatData(sub, { defaultExpand, expandedKeys }, newLevels)
	}

	return result;
});

export default formatData;