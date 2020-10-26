import { CustomTreeDataType, LevelsType } from './types/index';

let keyId = 1; // *自增Id

// # -1 - 啥都么有
// # 0 - 收缩器
// # 1 - 竖线
// # 2 - 横线
// # 3 - 转折线
// # 4 - 交叉线
const formatData = (data: CustomTreeDataType[], levels: LevelsType[] = []): CustomTreeDataType[] => {
	return data.map((item: CustomTreeDataType, index: number) => {
		const { id, value, sub, expand } = item;

		const newLevels: LevelsType[] = levels.map((level: LevelsType) => {
			if (level.value === 0 && index + 1 < data.length) {
				return { key: `rtt-expand-${keyId++}`, value: 4 }
			}
			if (level.value === 0 && index + 1 === data.length) {
				return { key: `rtt-expand-${keyId++}`, value: 3 }
			}
			if (level.value === 3) {
				return { key: `rtt-expand-${keyId++}`, value: -1 }
			}
			if (level.value === 4) {
				return { key: `rtt-expand-${keyId++}`, value: 1 }
			}
			return level;
		})
		if (sub && sub.length) {
			newLevels.push({ key: `rtt-expand-${keyId++}`, value: 0 });
		} else if (newLevels.length) {
			newLevels.push({ key: `rtt-expand-${keyId++}`, value: 2 });
		} else {
			newLevels.push({ key: `rtt-expand-${keyId++}`, value: -1 });
		}

		return {
			...item,
			id: id || `rtt-format-data-${keyId++}`,
			value,
			levels: newLevels,
			expand: expand || true,
			sub: sub && sub.length && formatData(sub, newLevels)
		}
	});
};

export default formatData;