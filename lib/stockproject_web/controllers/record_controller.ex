defmodule StockprojectWeb.RecordController do
  use StockprojectWeb, :controller

  alias Stockproject.Records
  alias Stockproject.Records.Record
  alias Stockproject.Stocks

  action_fallback StockprojectWeb.FallbackController

  def index(conn, _params) do
    records = Records.list_records()
    render(conn, "index.json", records: records)
  end

#{abbreviation: ""}
  def create(conn, %{"record" => record_params}) do
    stock = Stocks.prepare_stock(record_params["abbreviation"])
    params = Map.put(record_params, "stock_id", stock.id)
    with {:ok, %Record{} = record} <- Records.create_record(params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.record_path(conn, :show, record))
      |> render("show.json", record: record)
    end
  end

  def show(conn, %{"id" => id}) do
    record = Records.get_record!(id)
    render(conn, "show.json", record: record)
  end

  def update(conn, %{"id" => id, "record" => record_params}) do
    record = Records.get_record!(id)

    with {:ok, %Record{} = record} <- Records.update_record(record, record_params) do
      render(conn, "show.json", record: record)
    end
  end

  def delete(conn, %{"id" => id}) do
    record = Records.get_record!(id)

    with {:ok, %Record{}} <- Records.delete_record(record) do
      send_resp(conn, :no_content, "")
    end
  end
end
