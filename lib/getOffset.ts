function getOffset(pageNum: string, pageLimit?: number) {
    const limit = pageLimit || 25;
    const offset = (parseInt(pageNum, 10) - 1) * limit;
    return offset;
}
export default getOffset;
