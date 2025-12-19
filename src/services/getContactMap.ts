const getContactMap = async (
  userId: string,
  token: string,
  domain = "loma.bitrix24.com.br"
) => {
  const url = `https://${domain}/rest/${userId}/${token}/crm.contact.list`;
};
export default getContactMap;
