import { FlatList, View, Text, ActivityIndicator } from "react-native";
import styles from "../estilos/estilos";
import CardProduto from "./cardProduto";

export default function ListarProdutos({
  db,
  loading,
  onDelete,
  onEdit,
  refreshing = false,
  onRefresh,
  scrollEnabled = true,
}) {
 
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366F1" />
        <Text style={styles.loadingText}>Carregando produtos...</Text>
      </View>
    );
  }

  if (!db || db.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={{ fontSize: 48, marginBottom: 12 }}>�</Text>
        <Text style={styles.emptyText}>Nenhum produto cadastrado</Text>
      </View>
    );
  }

  if (!scrollEnabled) {
    return (
      <View style={{ paddingHorizontal: 16 }}>
        {db.map((item) => (
          <CardProduto
            key={item.id.toString()}
            props={item}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 16 }}>
      <FlatList
        style={styles.listScroll}
        scrollEnabled={scrollEnabled}
        data={db}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CardProduto
            props={item}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
    </View>
  );
}
