import { FlatList, View, Text, ActivityIndicator, ScrollView } from "react-native";
import CardProduto from "./cardProduto";
import styles from "../estilos/estilos";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";


interface Produto {
  id: number;
  nome: string;
  categoria: string;
  preco: string | number;
  descricao?: string;
  data?: string;
}

interface ListaProdutosProps {
  db: Produto[];
  loading: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

export default function ListarProdutos({
  db,
  loading,
  onDelete,
  onEdit,
  refreshing = false,
  onRefresh,
}: ListaProdutosProps) {
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
        <Text style={{ fontSize: 48, marginBottom: 12 }}>🛍️</Text>
        <Text style={styles.emptyText}>Nenhum produto cadastrado</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 16 }}>
      <FlatList
        scrollEnabled={true}
        data={db}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CardProduto
            props={item}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        )}
        contentContainerStyle={{ paddingVertical: 8 }}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
}


